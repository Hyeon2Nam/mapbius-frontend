import api from "./axiosSetting";

export const createTripRoute = (obj, token) => {
  return api.post("/api/private/travel-route/enroll", obj, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTripRouteData = (obj) => {
  return api.post("/api/public/travel-route/detail", obj);
};
