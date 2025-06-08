import api from "./axiosSetting";

export const getItemWithPage = (obj) => {
  return api.get("/api/public/notices/", { params: obj });
};

export const getItemInfo = (boardIdx) => {
  return api.get(`/api/public/notices/${boardIdx}`);
};

export const deleteItem = (obj, token) => {
  return api.post("/api/private/notice-delete", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editNotice = (obj, token) => {
  return api.post("/api/private/notice-update", obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const writeNotice = (obj, token) => {
  return api.post("/api/private/notice-post", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
