const workbench = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALISE_WORKBENCH':
      return {
        ...state
      }
    default:
      return state
  }
}

export default workbench;