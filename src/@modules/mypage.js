import { createSelector } from "@reduxjs/toolkit";

const CHANGE_PROFILE_IMG = "mypage/CHANGE_PROFILE_IMG";

export const changeProfileImg = (url) => ({
  type: CHANGE_PROFILE_IMG,
  url,
});

const selectMypage = (state) => state.mypage;

export const selectProfileImg = createSelector(
  [selectMypage],
  (mypage) => mypage.profileImg
);

const initialState = {
  profileImg: null,
};

export default function mypage(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PROFILE_IMG:
      return {
        ...state,
        profileImg: action.url,
      };

    default:
      return state;
  }
}
