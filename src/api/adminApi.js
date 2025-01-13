import api from "./axiosSetting";

export const setUserRight = (obj, token) => {
  console.log(obj, token);

  return api.post("/api/private/admin/grant/grant-role", obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setUserActive = (obj, token) => {
  console.log(obj, token);

  return api.post("/api/private/admin/grant/grant-state", obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
