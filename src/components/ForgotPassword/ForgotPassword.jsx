import React, { useState } from "react";
import "./ForgotPassword.css";
import Logo from "../../../public/logo.png";
import { IoMdArrowRoundBack } from "react-icons/io";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Password reset for:", email);
  };

  return (
    <div className="forgot-password-form">
      <img src={Logo} alt="Logo" className="logo" />
      <h3 className="title">Reset Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className={`form-label ${email ? "active" : ""}`}>
            Email Address<span className="req">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
            autoComplete="off"
            className="form-input"
          />
          <span className="msg">
            Please enter your email and verify your inbox to proceed with password reset.
          </span>
        </div>
        <button type="submit" className="btn btn-block bfp" >
          Submit
        </button>
      </form>
      <button className="back-button" onClick={onClose}>
        <IoMdArrowRoundBack className="back-icon" />
      </button>
    </div>
  );
};

export default ForgotPassword;
