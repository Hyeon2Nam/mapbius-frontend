import api from "./axiosSetting";

export const tryLogin = (obj) => {
  return api.post("/login", JSON.stringify(obj));
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
