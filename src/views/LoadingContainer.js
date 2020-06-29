import React from "react";

import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Spinner } from "reactstrap";
const { useDrizzleState } = drizzleReactHooks;

function LoadingContainer({ children }) {
  const drizzleStatus = useDrizzleState((state) => state.drizzleStatus);
  if (drizzleStatus.initialized === false) {
    return (
      <div className="spinny">
        <Spinner style={{ width: "3em", height: "3em" }} color="primary" />
      </div>
    );
  }
  return <>{children}</>;
}

export default LoadingContainer;
