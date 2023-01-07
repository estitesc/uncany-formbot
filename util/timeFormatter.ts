import _ from "lodash";
import { DateTime } from "luxon";

export const formatTime = (timeNow: DateTime) => {
  return timeNow.toFormat("HH:mm:ss");
};

export const gmtToUtc = (gmtString: string) => {
  return _.replace(_.replace(gmtString, "GMT", "UTC"), ":00", "");
};
