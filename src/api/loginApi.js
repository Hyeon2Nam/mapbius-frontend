import api from "./axiosSetting";

// lem0000@naver.com

export const tryLogin = (obj) => {
  return api.post("/api/login", JSON.stringify(obj));
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

// 아직 없음
export const findPw = (obj) => {
  return api.post("/api/public/forget-pw", JSON.stringify(obj));
};

export const adminLogin = (obj) => {
  return api.post("/api/public/login-admin", JSON.stringify(obj));
};

// export const areaList = () => {
//     return api.get("/area/list");
//   };

//   export const memberRegist = (obj) => {
//     return api.post("/member/regist", JSON.stringify(obj));
//   };

// export const itemGood = (obj) => {
//     return api.get("/item/good", { params: obj });
//   };
