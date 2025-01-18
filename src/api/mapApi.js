import api from "./axiosSetting";

export const chatChatGpt = (obj) => {
  return api.post("/api/public/chatgpt", JSON.stringify(obj));
};
