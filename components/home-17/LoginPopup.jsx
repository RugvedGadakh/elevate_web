'use client';

import { useState, useContext } from "react";
import { UserContext } from "@/app/layout";


const LoginPopup = ({ setShowModal }) => {
  const { userId, setUserId } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://elevatebackend-l9r9.onrender.com/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status !== 200) throw new Error("Invalid Credentials! Please try again.");

      const result = await response.json();
      alert(result.userId)
      if (result?.userId) {
        setUserId(result.userId);
        localStorage.setItem("userId", result.userId);
        console.log(result.userId);
        // alert(result.userId);
      }

      alert("Login Successful!");
      setEmail("");
      setPassword("");
      setShowModal(false);
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "300px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={() => setShowModal(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#ff5a5f",
          }}
        >
          ✖
        </button>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              opacity: isLoading ? 0.6 : 1,
              transition: "background 0.3s",
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
