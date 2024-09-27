import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginValidation from "./LoginValidation";
import usernameIcon from "../../assets/Username.png";
import passwordIcon from "../../assets/Password.png";
import showIcon from "../../assets/show.png";
import hiddenIcon from "../../assets/hidden.png";
import ForgotPassword from "./ForgotPassword";

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/Home");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = LoginValidation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setServerError("");
      axios
        .post("http://localhost:8081/Login", values)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/Home");
        })
        .catch((err) => {
          console.error("Login Error:", err);
          setServerError(
            err.response?.data?.error ||
              "Invalid login credentials. Please try again."
          );
        })
        .finally(() => setLoading(false));
    }
  };

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div
        className=" rounded-5 border border-secondary-subtle shadow p-5"
        style={{
          width: "clamp(400px, 30vw, 500px)",
          backgroundColor: "#990099",
        }}
      >
        <div>
          <h3 className="m-0 text-light">Welcome to</h3>
          <h1
            className="m-0 mb-4 fw-bolder"
            style={{ fontSize: "55px", color: "#ffff" }}
          >
            SIKAT eDiary
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="input-group mb-2">
            <span className="input-group-text p-1 px-2">
              <img
                src={usernameIcon}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInput}
              className="form-control rounded-end"
              value={values.username}
              disabled={loading}
            />
            {errors.username && (
              <span className="text-danger"> {errors.username}</span>
            )}
          </div>

          {/* Password field */}
          <div className="input-group position-relative">
            <span className="input-group-text p-1 px-2">
              <img
                src={passwordIcon}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </span>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              name="password"
              placeholder="Password"
              onChange={handleInput}
              className="form-control rounded-end pe-5"
              value={values.password}
              disabled={loading}
            />
            <div
              onClick={togglePasswordVisibility} // Toggle password visibility
              style={{ cursor: "pointer", zIndex: "5" }}
            >
              <img
                className="position-absolute"
                src={showPassword ? showIcon : hiddenIcon} // Switch icon
                alt="Toggle visibility"
                style={{
                  width: "15px",
                  height: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "15px",
                }}
              />
            </div>
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
          </div>
          <div className="text-end my-2">
            <ForgotPassword></ForgotPassword>
          </div>

          {/* Server error message */}
          {serverError && <span className="text-danger">{serverError}</span>}

          {/* Submit button */}
          <button
            type="submit"
            className="orangeButton w-100 py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                {" Loading..."}
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
