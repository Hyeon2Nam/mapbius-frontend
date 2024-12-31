import api from "./axiosSetting";

export const getItemWithPage = (obj) => {
  return api.get("/api/public/notices", { params: obj });
};
