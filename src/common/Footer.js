import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <div className="left-section">
          <img
            src={process.env.PUBLIC_URL + "/imgs/backCleraLogo.png"}
            alt=""
          />
          <div>
            <div>
              <b>지역 경제를 지원하는 여행, 우리의 미션입니다.</b>
            </div>
            <span>
              우리의 플랫폼은 여행자가 지역의 숨은 명소와 독특한 경험을
              발견하며, 현지 경제에 긍정적인 영향을 미칠 수 있도록 돕습니다.{" "}
              <br />
            </span>
            <span>함께 지역사회를 응원하고, 여행의 진정성을 만끽하세요.</span>
          </div>
          <div className="github-section">
            <Link to="https://github.com/Hyeon2Nam/mapbius-frontend">
              <img
                src={process.env.PUBLIC_URL + "/imgs/githubIcon.png"}
                alt=""
              />
              <span>FRONT</span>
            </Link>
            <Link to="">
              <img
                src={process.env.PUBLIC_URL + "/imgs/githubIcon.png"}
                alt=""
              />
              <span>BACK</span>
            </Link>
          </div>
        </div>
        <div className="right-section">
          <span>제작 박정원 남현이 이승현 유근형</span>
          <span>ⓒ 2025. Mapbius All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}
