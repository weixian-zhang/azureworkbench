// import { 
//     ADD_DIAGRAM,
//     DELETE_DIAGRAM,
//     ADD_VERTEX,
//     UPDATE_VERTEX,
//     DELETE_VERTEX
//   } from "../actions/graphActions";

// import GraphContext from '../../models/GraphContext';

// const graphContext = new GraphContext();

// export default function graphReducer(state = graphContext, action) {
//     switch (action.type) {
  
//       case ADD_DIAGRAM:
//         state.diagrams.push(action.diagram)
//         return state;  
//       break;
  
//       case DELETE_DIAGRAM:
//         state.diagrams = state.diagrams.filter(diagram => {
//             return diagram.diagramId != action.diagramId;
//           })
//       break;
  
//       case ADD_VERTEX:
//           var diagram = state.diagrams.filter(diagram => {
//             return diagram.diagramId == action.diagramId;
//           })

//           diagram.vertices.push(action.vertex);
//       break;
  
//       case UPDATE_VERTEX:
//       break;

//     case DELETE_VERTEX:
//     break;
  
//       default:
//         return state;
  
//     }
//   }