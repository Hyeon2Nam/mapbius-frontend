import api from "./axiosSetting";

export const leaveAccount = (token) => {
  console.log(token);

  return api.post("/api/private/account/delete", "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
