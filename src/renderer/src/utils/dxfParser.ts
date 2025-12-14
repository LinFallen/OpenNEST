import DxfParser from 'dxf-parser';
import * as THREE from 'three';

export interface DXFEntity {
  type: string;
  layer: string;
  color?: number;
  vertices?: THREE.Vector3[];
  center?: THREE.Vector3;
  radius?: number;
}

export interface ClosedShape {
  entities: DXFEntity[];
  bounds: {
    min: THREE.Vector3;
    max: THREE.Vector3;
  };
  name: string;
  layer: string;
}

export interface ParsedDXF {
  shapes: ClosedShape[]; // Changed from entities to shapes
  layers: string[];
}

/**
 * Check if two points are close enough to be considered connected
 */
function pointsEqual(p1: THREE.Vector3, p2: THREE.Vector3, tolerance = 0.001): boolean {
  return p1.distanceTo(p2) < tolerance;
}

/**
 * Get start and end points of an entity
 */
function getEntityEndpoints(entity: DXFEntity): { start: THREE.Vector3; end: THREE.Vector3 } | null {
  if (entity.type === 'LINE' && entity.vertices && entity.vertices.length >= 2) {
    return {
      start: entity.vertices[0],
      end: entity.vertices[1]
    };
  }
  
  if ((entity.type === 'POLYLINE' || entity.type === 'ARC') && entity.vertices && entity.vertices.length >= 2) {
    return {
      start: entity.vertices[0],
      end: entity.vertices[entity.vertices.length - 1]
    };
  }
  
  return null;
}

/**
 * Check if an entity forms a closed loop on its own
 */
function isSelfClosed(entity: DXFEntity): boolean {
  // Circles are always closed
  if (entity.type === 'CIRCLE') {
    return true;
  }
  
  // Check DXF shape flag (70=1 in DXF means closed)
  // dxf-parser sets this as entity.shape = true
  if ((entity as any).shape === true) {
    return true;
  }
  
  // Fallback: Check if polyline/arc start/end points connect
  if ((entity.type === 'POLYLINE' || entity.type === 'ARC') && entity.vertices && entity.vertices.length >= 3) {
    const start = entity.vertices[0];
    const end = entity.vertices[entity.vertices.length - 1];
    return pointsEqual(start, end);
  }
  
  return false;
}

/**
 * Find connected entities that form closed shapes
 */
function findClosedShapes(entities: DXFEntity[]): ClosedShape[] {
  const shapes: ClosedShape[] = [];
  const used = new Set<number>();
  
  entities.forEach((entity, index) => {
    if (used.has(index)) return;
    
    // Handle self-closed entities (circles, closed polylines)
    if (isSelfClosed(entity)) {
      const bounds = calculateBounds([entity]);
      shapes.push({
        entities: [entity],
        bounds,
        name: `Part ${shapes.length + 1}`,
        layer: entity.layer
      });
      used.add(index);
      return;
    }
    
    // Try to find connected entities for this one
    const shapeEntities: DXFEntity[] = [entity];
    const shapeIndices: number[] = [index];
    used.add(index);
    
    let currentEnd = getEntityEndpoints(entity);
    if (!currentEnd) return;
    
    let searchPoint = currentEnd.end;
    const startPoint = currentEnd.start;
    const maxIterations = entities.length;
    let iterations = 0;
    
    // Keep searching for connected entities
    while (iterations < maxIterations) {
      iterations++;
      
      let found = false;
      
      for (let i = 0; i < entities.length; i++) {
        if (used.has(i)) continue;
        
        const endpoints = getEntityEndpoints(entities[i]);
        if (!endpoints) continue;
        
        // Check if this entity connects to our current search point
        if (pointsEqual(searchPoint, endpoints.start)) {
          shapeEntities.push(entities[i]);
          shapeIndices.push(i);
          used.add(i);
          searchPoint = endpoints.end;
          found = true;
          break;
        } else if (pointsEqual(searchPoint, endpoints.end)) {
          // Reverse the entity to maintain direction
          const reversed = { ...entities[i] };
          if (reversed.vertices) {
            reversed.vertices = [...reversed.vertices].reverse();
          }
          shapeEntities.push(reversed);
          shapeIndices.push(i);
          used.add(i);
          searchPoint = endpoints.start;
          found = true;
          break;
        }
      }
      
      if (!found) break;
      
      // Check if we've closed the loop
      if (pointsEqual(searchPoint, startPoint)) {
        // We found a closed shape!
        const bounds = calculateBounds(shapeEntities);
        shapes.push({
          entities: shapeEntities,
          bounds,
          name: `Part ${shapes.length + 1}`,
          layer: shapeEntities[0].layer
        });
        break;
      }
    }
  });
  
  return shapes;
}

/**
 * Calculate bounding box for a group of entities
 */
function calculateBounds(entities: DXFEntity[]): { min: THREE.Vector3; max: THREE.Vector3 } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  entities.forEach(entity => {
    if (entity.vertices) {
      entity.vertices.forEach(v => {
        minX = Math.min(minX, v.x);
        minY = Math.min(minY, v.y);
        maxX = Math.max(maxX, v.x);
        maxY = Math.max(maxY, v.y);
      });
    }
    
    if (entity.center && entity.radius) {
      minX = Math.min(minX, entity.center.x - entity.radius);
      minY = Math.min(minY, entity.center.y - entity.radius);
      maxX = Math.max(maxX, entity.center.x + entity.radius);
      maxY = Math.max(maxY, entity.center.y + entity.radius);
    }
  });
  
  return {
    min: new THREE.Vector3(minX, minY, 0),
    max: new THREE.Vector3(maxX, maxY, 0)
  };
}

/**
 * Parse DXF file content and identify closed shapes
 */
export function parseDXF(fileContent: string): ParsedDXF {
  const parser = new DxfParser();
  let dxf;

  try {
    dxf = parser.parseSync(fileContent);
  } catch (err) {
    console.error('DXF parse error:', err);
    throw new Error('Failed to parse DXF file');
  }

  const entities: DXFEntity[] = [];
  const layers = new Set<string>();

  // Process entities
  if (dxf.entities) {
    dxf.entities.forEach((entity: any) => {
      const layer = entity.layer || '0';
      layers.add(layer);

      switch (entity.type) {
        case 'LINE': {
          const start = new THREE.Vector3(
            entity.vertices[0].x,
            entity.vertices[0].y,
            0
          );
          const end = new THREE.Vector3(
            entity.vertices[1].x,
            entity.vertices[1].y,
            0
          );

          entities.push({
            type: 'LINE',
            layer,
            color: entity.color,
            vertices: [start, end]
          });
          break;
        }

        case 'LWPOLYLINE':
        case 'POLYLINE': {
          const vertices = entity.vertices.map(
            (v: any) => new THREE.Vector3(v.x, v.y, 0)
          );

          entities.push({
            type: 'POLYLINE',
            layer,
            color: entity.color,
            vertices
          });
          break;
        }

        case 'CIRCLE': {
          const center = new THREE.Vector3(
            entity.center.x,
            entity.center.y,
            0
          );

          entities.push({
            type: 'CIRCLE',
            layer,
            color: entity.color,
            center,
            radius: entity.radius
          });
          break;
        }

        case 'ARC': {
          const center = new THREE.Vector3(
            entity.center.x,
            entity.center.y,
            0
          );
          const startAngle = (entity.startAngle * Math.PI) / 180;
          const endAngle = (entity.endAngle * Math.PI) / 180;
          const segments = 32;
          const vertices: THREE.Vector3[] = [];

          for (let i = 0; i <= segments; i++) {
            const angle = startAngle + (i / segments) * (endAngle - startAngle);
            const x = center.x + entity.radius * Math.cos(angle);
            const y = center.y + entity.radius * Math.sin(angle);
            vertices.push(new THREE.Vector3(x, y, 0));
          }

          entities.push({
            type: 'ARC',
            layer,
            color: entity.color,
            vertices
          });
          break;
        }

        default:
          console.warn(`Unsupported entity type: ${entity.type}`);
      }
    });
  }

  // Find closed shapes
  const shapes = findClosedShapes(entities);

  return {
    shapes,
    layers: Array.from(layers)
  };
}

/**
 * Convert DXF entities to Three.js Line objects
 */
export function entitiesToThreeObjects(entities: DXFEntity[]): THREE.Object3D[] {
  const objects: THREE.Object3D[] = [];

  entities.forEach((entity) => {
    let geometry: THREE.BufferGeometry | null = null;

    switch (entity.type) {
      case 'LINE':
      case 'POLYLINE':
      case 'ARC':
        if (entity.vertices) {
          geometry = new THREE.BufferGeometry().setFromPoints(entity.vertices);
        }
        break;

      case 'CIRCLE':
        if (entity.center && entity.radius) {
          const curve = new THREE.EllipseCurve(
            entity.center.x,
            entity.center.y,
            entity.radius,
            entity.radius,
            0,
            2 * Math.PI,
            false,
            0
          );
          const points = curve.getPoints(64);
          geometry = new THREE.BufferGeometry().setFromPoints(
            points.map((p) => new THREE.Vector3(p.x, p.y, 0))
          );
        }
        break;
    }

    if (geometry) {
      const material = new THREE.LineBasicMaterial({
        color: entity.color || 0xe0e0e0,
        linewidth: 1
      });
      const line = new THREE.Line(geometry, material);
      line.userData = { layer: entity.layer };
      objects.push(line);
    }
  });

  return objects;
}
