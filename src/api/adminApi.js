import api from "./axiosSetting";

export const setUserRight = (obj, token) => {
  return api.post("/api/private/admin/grant/grant-role", obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setUserActive = (obj, token) => {
  return api.post("/api/private/admin/grant/grant-state", obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
