import { atom } from "recoil";

export const managedInitiatives = atom({
  key: "managedInitiatives",
  default: [],
});

export const activeInitiatives = atom({
  key: "activeInitiatives",
  default: [],
});
