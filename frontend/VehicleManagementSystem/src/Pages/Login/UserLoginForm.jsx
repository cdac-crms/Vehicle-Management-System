import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/AuthenticationService"; // Adjust path as needed

const UserLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setError("");
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required.");
      return false;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData); // backend should return token, role, email, id

      // Store token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.userRole); // from backend response
      localStorage.setItem("email", data.email);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("name", data.firstName);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6fc"
      }}
    >
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "linear-gradient(145deg, #ffffff, #e3e8f9)",
          border: "1px solid #dce3f1",
          fontSize: "0.88rem"
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#102649", fontWeight: "bold" }}>
          User Login
        </h2>

        {error && <div className="alert alert-danger rounded-pill text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              name="email"
              type="email"
              className="form-control rounded-pill border border-secondary-subtle"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold d-flex justify-content-between">
              <span>Password</span>
              <Link to="/forgot-password" className="small text-decoration-none text-primary">
                Forgot Password?
              </Link>
            </label>
            <input
              name="password"
              type="password"
              className="form-control rounded-pill border border-secondary-subtle"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn rounded-pill text-white" style={{ backgroundColor: "#102649" }} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill"
              onClick={handleSignUp}
              disabled={loading}
            >
              Don't have an account? <span>Register Here</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
