import React, { useState } from "react";
import AuthService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const authservice = new AuthService();
  const [formdata, setformdata] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await authservice.Userlogin(formdata);

      console.log(res);
      localStorage.setItem("token", res.token);
      alert("login Successful!");
      navigate("/home");
    } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto bg-white p-6 rounded-xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-600 text-sm">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-600 text-sm">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
