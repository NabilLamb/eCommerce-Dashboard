import React, { useState, useContext } from "react";
import "./SignInSignUp.css";
import Logo from "../../../public/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userData } from "../../data/index";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import { UserContext } from "../../components/UserContext/UserContext";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignInSignUp = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [signupFields, setSignupFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    address: "",
    city: "",
    country: "",
    imageUrl: "",
  });

  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "signup") {
      setSignupFields({ ...signupFields, [name]: value });
    } else {
      setLoginFields({ ...loginFields, [name]: value });
    }
  };

  const handleFocus = (e) => {
    const label = e.target.previousSibling;
    label.classList.add("active", "highlight");
  };

  const handleBlur = (e, formType) => {
    const label = e.target.previousSibling;
    if (formType === "signup" && signupFields[e.target.name] === "") {
      label.classList.remove("active", "highlight");
    } else if (formType === "login" && loginFields[e.target.name] === "") {
      label.classList.remove("active", "highlight");
    } else {
      label.classList.remove("highlight");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Find user in userData with matching email and password
    const user = userData.find(
      (u) =>
        u.email === loginFields.email && u.password === loginFields.password
    );

    if (user && user.role === "admin") {
      setUser(user);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials or not an admin!");
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
  };


  return (
    <div className="container">
      <div id="auth-form" className="auth-form no-blur">
        {showForgotPassword ? (
          <ForgotPassword onClose={handleCloseForgotPassword} />
        ) : (
          <>
            <ul className="tab-group-switch">
              <li className={`tab ${activeTab === "signup" ? "active" : ""}`}>
                <a onClick={() => handleTabClick("signup")}>Sign Up</a>
              </li>
              <li className={`tab ${activeTab === "login" ? "active" : ""}`}>
                <a onClick={() => handleTabClick("login")}>Log In</a>
              </li>
            </ul>

            <div className="tab-content">
              <div
                id="signup"
                style={{ display: activeTab === "signup" ? "block" : "none" }}
              >
                <img src={Logo} alt="Logo" className="logo" />
                <h3 className="title">Admin Dashboard</h3>
                <form action="/" method="post">
                  <div className="same-row">
                    <div className="form-field">
                      <label
                        className={`form-label ${
                          signupFields.firstName ? "active" : ""
                        }`}
                      >
                        First Name<span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={signupFields.firstName}
                        onChange={(e) => handleInputChange(e, "signup")}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "signup")}
                        required
                        autoComplete="off"
                        className="form-input"
                      />
                    </div>

                    <div className="form-field">
                      <label
                        className={`form-label ${
                          signupFields.lastName ? "active" : ""
                        }`}
                      >
                        Last Name<span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={signupFields.lastName}
                        onChange={(e) => handleInputChange(e, "signup")}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "signup")}
                        required
                        autoComplete="off"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label
                      className={`form-label ${
                        signupFields.email ? "active" : ""
                      }`}
                    >
                      Email Address<span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={signupFields.email}
                      onChange={(e) => handleInputChange(e, "signup")}
                      onFocus={handleFocus}
                      onBlur={(e) => handleBlur(e, "signup")}
                      required
                      autoComplete="off"
                      className="form-input"
                    />
                  </div>

                  <div className="same-row">
                    <div className="form-field">
                      <label
                        className={`form-label ${
                          signupFields.password ? "active" : ""
                        }`}
                      >
                        Set A Password<span className="req">*</span>
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={signupFields.password}
                        onChange={(e) => handleInputChange(e, "signup")}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "signup")}
                        required
                        autoComplete="off"
                        className="form-input"
                      />
                      <span
                        className="toggle-password"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>

                    <div className="form-field">
                      <label
                        className={`form-label ${
                          signupFields.confirmPassword ? "active" : ""
                        }`}
                      >
                        Confirm Password<span className="req">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={signupFields.confirmPassword}
                        onChange={(e) => handleInputChange(e, "signup")}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "signup")}
                        required
                        autoComplete="off"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="same-row">
                    <div className="form-field">
                      <label
                        className={`form-label ${
                          signupFields.contactNumber ? "active" : ""
                        }`}
                      >
                        Contact Number<span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactNumber"
                        value={signupFields.contactNumber}
                        onChange={(e) => handleInputChange(e, "signup")}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "signup")}
                        required
                        autoComplete="off"
                        className="form-input"
                      />
                    </div>

                    <div className="form-field">
                      <label
                        className={`form-label ${
                          signupFields.address ? "active" : ""
                        }`}
                      >
                        Address<span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={signupFields.address}
                        onChange={(e) => handleInputChange(e, "signup")}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "signup")}
                        required
                        autoComplete="off"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="same-row">
                    <div className="form-field">
                      <label
                        className={`form-label ${
                          signupFields.city ? "active" : ""
                        }`}
                      >
                        City<span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={signupFields.city}
                        onChange={(e) => handleInputChange(e, "signup")}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "signup")}
                        required
                        autoComplete="off"
                        className="form-input"
                      />
                    </div>

                    <div className="form-field">
                      <label
                        className={`form-label ${
                          signupFields.country ? "active" : ""
                        }`}
                      >
                        Country<span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={signupFields.country}
                        onChange={(e) => handleInputChange(e, "signup")}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "signup")}
                        required
                        autoComplete="off"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    {/* <label
                      className={`form-label ${
                        signupFields.imageUrl ? "active" : ""
                      }`}
                    >
                      Upload Image<span className="req">*</span>
                    </label> */}
                    <label htmlFor="file" className="file-label">Profile Image</label>
                    <input
                      type="file"
                      name="imageUrl"
                      onChange={(e) => handleInputChange(e, "signup")}
                      onFocus={handleFocus}
                      onBlur={(e) => handleBlur(e, "signup")}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <input type="checkbox" name="agreement" required />
                    <label className="form-label agreement">
                      I agree to the responsibilities of being an admin.
                    </label>
                  </div>

                  <button type="submit" className="btn btn-block">
                    Sign Up
                  </button>
                </form>
              </div>

              <div
                id="login"
                style={{ display: activeTab === "login" ? "block" : "none" }}
              >
                <img src={Logo} alt="Logo" className="logo" />
                <h3 className="title">Admin Dashboard</h3>
                <form action="/" method="post" onSubmit={handleLogin}>
                  <div className="form-field">
                    <label
                      className={`form-label ${
                        loginFields.email ? "active" : ""
                      }`}
                    >
                      Email Address<span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={loginFields.email}
                      onChange={(e) => handleInputChange(e, "login")}
                      onFocus={handleFocus}
                      onBlur={(e) => handleBlur(e, "login")}
                      required
                      autoComplete="off"
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label
                      className={`form-label ${
                        loginFields.password ? "active" : ""
                      }`}
                    >
                      Password<span className="req">*</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginFields.password}
                      onChange={(e) => handleInputChange(e, "login")}
                      onFocus={handleFocus}
                      onBlur={(e) => handleBlur(e, "login")}
                      required
                      autoComplete="off"
                      className="form-input"
                    />
                    <span
                      className="toggle-password"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <p
                    className="forgot-password"
                    onClick={handleForgotPasswordClick}
                  >
                    Forgot Password?
                  </p>
                  <button type="submit" className="btn btn-block">
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInSignUp;
