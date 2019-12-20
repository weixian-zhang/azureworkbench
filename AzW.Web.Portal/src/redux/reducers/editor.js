import { 
  EDITOR_LOAD_SERVICES
} from "../actions"

const initialState = {
  resources: null
}

export default function editorReducer(state=initialState, action) {
  switch (action.type) {

    case EDITOR_LOAD_SERVICES:
      return {
        ...state,
        resources: action.resources
      }

    default:
      return state;

  }
}