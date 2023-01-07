import * as React from "react";
import SessionUserContext from "./SessionUserContext";

interface SessionUserProviderProps {
  children?: React.ReactNode;
}

const SessionUserProvider: React.FC<SessionUserProviderProps> = ({
  children,
}) => {
  const [userId, setUserId] = React.useState("");

  return (
    <SessionUserContext.Provider
      value={{
        userId,
        setUserId,
      }}
    >
      {children}
    </SessionUserContext.Provider>
  );
};

export default SessionUserProvider;
