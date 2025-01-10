import api from "./axiosSetting";

// lem0000@naver.com

export const tryLogin = (obj) => {
  return api.post("/api/public/login", JSON.stringify(obj));
};

export const tryRegister = (obj) => {
  return api.post("/api/public/join", JSON.stringify(obj));
};

export const idDuplicateCheck = (obj) => {
  return api.post("/api/public/join-id-check", JSON.stringify(obj));
};

export const emailDuplicateCheck = (obj) => {
  return api.post("/api/public/join-email-check", JSON.stringify(obj));
};

export const findId = (obj) => {
  return api.post("/api/public/forget-id", JSON.stringify(obj));
};

export const findPw = (obj) => {
  return api.post("/api/public/account-exist/pw-update", JSON.stringify(obj));
};

export const adminLogin = (obj) => {
  return api.post("/api/public/login-admin", JSON.stringify(obj));
};

export const tryKakaoLogin = (authorizationCode) => {
  return api.post("/oauth/kakao/login", { code: authorizationCode });
};

export const tryKakaoRegister = (obj, token) => {
  return api.post("/api/private/kakao/join", JSON.stringify(obj), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
