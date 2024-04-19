import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '../../stylesheets/loginPage.css'; // Ensure the path is correct

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/user/login`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("accessToken", res.accessToken); // Assume accessToken is part of response
      navigate("/home");
    } catch (error) {
      setError(error.response?.data.message);
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
          <label className="label">Password</label>
          <input className="input" type="password" name="password" onChange={handleChange} placeholder="Password" />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="button">Log In</button>
        <div className="text-muted pt-1">
          Don't have an account?
          <Link to="/signup" className="label"> Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
