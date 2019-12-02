import React from "react";
import { H3, Classes, Button, Intent, Overlay, Spinner } from "@blueprintjs/core";
import { Route } from "react-router-dom";
import "../../assets/css/Authentication.css";

const ProtectedRoute = ({ 
  component: Component, 
  account, 
  overlayState, 
  onOverlayClose,
  onMsalLogin,
  isLoginInProcess,
  ...rest }) => (
  <Route
    { ...rest }
    render={ props =>
      account != null ? (
        <Component {...props} />
      ) : (
        <div>
          <Overlay isOpen={overlayState.isOpen} onClose={onOverlayClose} hasBackdrop={false} usePortal={true} canOutsideClickClose={false} canEscapeKeyClose={true}>
            <div className={[Classes.CARD, Classes.ELEVATION_4, "login-overlay"]}>
              { !isLoginInProcess ? (
              <div>
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
              ) : <Spinner intent={Intent.PRIMARY} size={50} />}
            </div>
          </Overlay>
          <Component {...props} />
        </div>
      )
    }
  />
);

export default ProtectedRoute;