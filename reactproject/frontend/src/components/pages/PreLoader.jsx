import react, { useEffect } from "react";
import { preLoaderAnim } from "../Animation/PreLoaderAnim";
import logo from "../../assets/TransparentLogo.png";

export const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="text-container">
        <span>Equality, </span>
        <span>Empowerment, </span>
        <span>Inclusivity</span>
      </div>
    </div>
  );
};
