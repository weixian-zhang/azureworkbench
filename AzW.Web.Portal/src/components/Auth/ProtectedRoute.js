import React from "react";
import { H3, Classes, Button, Intent, Overlay } from "@blueprintjs/core";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, account, overlayState, onOverlayClose, onMsalLogin, ...rest }) => (
  <Route
    { ...rest }
    render={ props =>
      account != null ? (
        <Component {...props} />
      ) : (
        <div>
          <Overlay isOpen={overlayState.isOpen} onClose={onOverlayClose} hasBackdrop={false} usePortal={true} canOutsideClickClose={true} canEscapeKeyClose={true}>
            <div className={[Classes.CARD, Classes.ELEVATION_4, "login-overlay"]}>
              <H3>Welcome!</H3>
              <p>
                Azure workbench is a tool to visualise your cloud architecture and export them into a json file to deploy it easily.
              </p>
              <p>
                  Save your deployments by logging in to your Azure account.
              </p>
              <br />
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                  <Button onClick={onOverlayClose} style={{ margin: "" }}>
                    Decide later
                  </Button>
                  <Button onClick={onMsalLogin} intent={Intent.PRIMARY} style={{ margin: "" }}>
                    Login with Azure
                  </Button>
              </div>
            </div>
          </Overlay>
          <Component {...props} />
        </div>
      )
    }
  />
);

export default ProtectedRoute;