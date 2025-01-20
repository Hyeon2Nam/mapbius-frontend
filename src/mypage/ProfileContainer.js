import { useDispatch, useSelector } from "react-redux";
import { changeProfileImg } from "../@modules/mypage";
import ProfileImageUpload from "./ProfileImageUpload";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const onChangeProfileImg = (src) => dispatch(changeProfileImg(src));

  return <ProfileImageUpload onChangeProfileImg={onChangeProfileImg} />;
};

export default ProfileContainer;
