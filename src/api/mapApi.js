import api from "./axiosSetting";

export const chatChatGpt = (obj) => {
  return api.post("/api/public/chatgpt", JSON.stringify(obj));
};

export const addReviewItem = (obj, token) => {
  return api.post("/api/private/reviews/enroll", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getReviewList = (obj) => {
  return api.post("/api/public/reviews/select-list", JSON.stringify(obj));
};

export const getRateAndCnt = (obj) => {
  return api.post("/api/public/reviews/get", JSON.stringify(obj));
};

export const plusHeartCnt = (obj, token) => {
  return api.post("/api/private/reviews/heart", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setBookmark = (obj, token) => {
  console.log(obj, token);

  return api.post("/api/private/account/favorite/enroll", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBookmarkList = (obj, token) => {
  return api.post("/api/private/account/favorite/mylist", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
