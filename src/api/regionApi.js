import api from "./axiosSetting";

export const getRegionPopulation = (obj) => {
  return api.get("/api/public/kr-data/population-search", { params: obj });
};

export const getRegionTour = (obj) => {
  return api.get("/api/public/kr-data/festival-info", { params: obj });
};

export const getRegionName = (obj) => {
  return api.get("/api/public/kr-data/entire-sigungo-list", { params: obj });
};

export const getRegionProduct = (obj) => {
  return api.get("/api/public/kr-data/entire-specialty-list", { params: obj });
};

export const getRegionNews = (obj) => {
  return api.get("/api/public/naver/search", { params: obj });
};

export const getRegionImg = (obj) => {
  return api.get("/api/public/naver/image-search", { params: obj });
};

export const getRegionFes = (obj) => {
  return api.get("/api/public/kr-data/festival-info", { params: obj });
};
