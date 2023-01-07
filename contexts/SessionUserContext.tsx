import * as React from "react";

export const defaultSessionUser: any = {
  userId: "DEFAULT",
};

const SessionUserContext = React.createContext({
  userId: defaultSessionUser.userId,
  setUserId: (userId: string) => {},
});

export default SessionUserContext;
