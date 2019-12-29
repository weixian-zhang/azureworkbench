export const ADD_DIAGRAM = "ADD_DIAGRAM";
export const DELETE_DIAGRAM = "DELETE_DIAGRAM";
export const ADD_VERTEX = "ADD_VERTEX";
export const UPDATE_VERTEX = "UPDATE_VERTEX";
export const DELETE_VERTEX = "DELETE_VERTEX";

export function addDiagram(diagram) {
    return {
        type: ADD_DIAGRAM,
        diagram: diagram
    }
}

export function deleteDiagram(diagramId) {
  return {
      type: DELETE_DIAGRAM,
      diagramId: diagramId
  }
}

export function addVertex(diagramId, vertex) {
  return {
      type: ADD_VERTEX,
      diagramId: diagramId,
      vertex: vertex
  }
}

export function updateVertex(existingVertexId, newVertex) {
  return {
      type: UPDATE_VERTEX,
      existingVertexId: existingVertexId,
      newVertex, newVertex
  }
}

export function deleteVertex(vertexId) {
  return {
      type: DELETE_VERTEX,
      vertexId: vertexId
  }
}