import { atom } from "recoil";

export const isAdminState = atom({
  key: "isAdminState",
  default: null,
});

export const quillValue = atom({
  key: "quillValue",
  default: "",
});

export const quillImages = atom({
  key: "quillImages",
  default: [],
});
