import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const url = "http://localhost:3000/api/auth";
      const { data: res } = await axios.post(url, data);
      // navigate("/login");
      localStorage.setItem("token", res.data);
      window.location = "/";
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
              />
            </div>

            {error && <dev>{error}</dev>}

            <button type="submit" className="btn btn-primary">
              Sing in
            </button>

            {/* Register buttons */}
            <div className="text-center">
              <p>
                Not a member? <Link to="/signup">Register</Link>
              </p>
              <p>or sign up with:</p>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f" />
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google" />
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter" />
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
