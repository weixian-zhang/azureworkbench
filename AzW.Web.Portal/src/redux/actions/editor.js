import { EDITOR_LOAD_SERVICES } from "./constants";

export function loadServices() {
  return dispatch => {
    const resourceContext = require.context("../../azure-services/", true, /\.json$/);
    const resources = {};
    resourceContext.keys().forEach((key) => {
      const individualResource = resourceContext(key);
      if (individualResource["resourceCategory"] in resources) {
        resources[individualResource["resourceCategory"]].push(individualResource);
      } else {
        resources[individualResource["resourceCategory"]] = [];
        resources[individualResource["resourceCategory"]].push(individualResource);
      }
    });
    dispatch(() => {
      return {
        type: EDITOR_LOAD_SERVICES,
        resources
      }
    });
  };
}