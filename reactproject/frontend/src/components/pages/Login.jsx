import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginValidation from "./LoginValidation";

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#990099" }}
    >
      <div className="bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleInput}
              className="form-control rounded-0"
              value={values.username}
              disabled={loading}
            />
            {errors.username && (
              <span className="text-danger"> {errors.username}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInput}
              className="form-control rounded-0"
              value={values.password}
              disabled={loading}
            />
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
          </div>

          {serverError && <span className="text-danger">{serverError}</span>}

          <button type="submit" className="btn btn-success" disabled={loading}>
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

          <p>
            Don't have an account?{" "}
            <Link
              to="/Register"
              className="link-underline link-underline-opacity-0"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
