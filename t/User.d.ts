interface User {
  basics: UserBasics;
  isLoggedIn: Boolean;
}

interface UserBasics {
  uid: string;
  email: string;
}

interface UserPreferences {
  hasGCalPermission: Boolean;
  calIsPublic: Boolean;
  displayName?: string;
  sillyString?: string;
  tempFormat: string;
  timeFormat: string;
}

interface UserPrivate {
  intentionGCalId?: string;
  programGCalId?: string;
}
