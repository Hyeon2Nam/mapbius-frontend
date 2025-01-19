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

export const accountKakaoLink = (obj, token) => {
  return api.post("/api/private/account/kakao/connect", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadProfileImg = (obj, token) => {
  if (!(obj instanceof FormData)) {
    const formData = new FormData();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }
    obj = formData;
  }

  return api.post("/api/private/account/uploadProfileImage", obj, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfileImg = (token) => {
  return api.post("/api/private/account/getProfileImage", "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserBookmarkList = (token) => {
  return api.post("/api/private/account/favorite/mylist", "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
