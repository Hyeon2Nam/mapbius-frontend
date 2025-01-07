import api from "./axiosSetting";

export const leaveAccount = (token) => {
  return api.post("/api/private/account/delete", "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserInfo = (obj, token) => {
  return api.post("/api/private/account/confirm", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editUserData = (obj, token) => {
  return api.post("/api/private/account/update", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
