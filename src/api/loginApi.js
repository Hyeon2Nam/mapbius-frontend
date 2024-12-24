import api from "./axiosSetting";

export const tryLogin = (obj) => {
  return api.post("/api/login", JSON.stringify(obj));
};

export const tryRegister = (obj) => {
  return api.post("/api//register", JSON.stringify(obj));
};

export const findId = (obj) => {
  return api.post("/api//findId", JSON.stringify(obj));
};

export const findPw = (obj) => {
  return api.post("/api//findPw", JSON.stringify(obj));
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
