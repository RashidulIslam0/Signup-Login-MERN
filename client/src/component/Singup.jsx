import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Singup = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
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
      const url = "http://localhost:3000/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
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
          <h2 className="mb-4">Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
              />
            </div>
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
              Sing Up
            </button>

            <p className="text-center text-muted mt-5 mb-0">
              Have already an account?
              <Link to="/login" className="fw-bold text-body">
                <u>Login here</u>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
