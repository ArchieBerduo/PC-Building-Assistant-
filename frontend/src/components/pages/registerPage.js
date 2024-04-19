import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../stylesheets/registerPage.css'; // Ensure the path is correct

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/user/signup`;
      await axios.post(url, data);
      navigate("/login"); // Navigate after successful registration
    } catch (error) {
      setError(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label className="label">Username</label>
          <input className="input" type="text" name="username" onChange={handleChange} placeholder="Enter username" />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" name="email" onChange={handleChange} placeholder="Enter email" />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" name="password" onChange={handleChange} placeholder="Password" />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;

