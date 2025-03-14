'use client';

import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import HeaderNavContent from "../header/HeaderNavContent";
import Image from "next/image";
import { UserContext } from "@/app/layout";

const Header = () => {
  const { userId, setUserId } = useContext(UserContext);
  const [navbar, setNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle Navbar background on scroll
  const changeBackground = () => {
    setNavbar(window.scrollY >= 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  // Load userId from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [setUserId]);

  // Log userId when it updates
  useEffect(() => {
    console.log("Updated userId:", userId);
  }, [userId]);

  // Register User
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      setIsLoading(true);
    
      const dataToSend = { email, password };
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
    
      if (response.status !== 201) {
        throw new Error("Registration not done!");
      }
    
      const result = await response.json();
      console.log("Response from API after registration:", result);
    
      if (result?.user?._id) {
        setUserId(result.user._id);
        localStorage.setItem("userId", result.user._id);
        console.log("User ID from API:", result.user._id);
    
        // Fetch user details after registration
        const userResponse = await fetch(`http://localhost:5000/api/users/${result.user._id}`);
    
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
    
        const userData = await userResponse.json();
        console.log("Fetched User Data:", userData);
        alert(`Fetched User Data: ${JSON.stringify(userData, null, 2)}`);
      }
    
      alert("Registered Successfully!");
      setEmail("");
      setPassword("");
      setShowModal(false);
    } catch (error) {
      console.error("Registration Error:", error);
      setError(error.message || "Registration failed. Please try again.");
      alert(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
    
    
  };

  // Logout User
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userId"); // Remove from localStorage
      setUserId(null);
      alert("Logged out successfully!");
    }
  };

  return (
    <header
  style={{
    position: navbar ? "fixed" : "relative",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: navbar ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
    transition: "all 0.3s ease-in-out",
    padding: "10px 0",
    zIndex: 1000,
  }}
>
  <div style={{ width: "90%", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Link href="/">
        <Image width={154} height={50} src="/images/elevate_logo.png" alt="brand" />
      </Link>
    </div>

    <HeaderNavContent />

    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {userId ? (
        <button
          onClick={handleLogout}
          disabled={isLoading}
          style={{
            backgroundColor: "#ff5a5f",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            opacity: isLoading ? 0.6 : 1,
            transition: "background 0.3s",
          }}
        >
          Registered (Logout)
        </button>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          disabled={isLoading}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            opacity: isLoading ? 0.6 : 1,
            transition: "background 0.3s",
          }}
        >
          Register
        </button>
      )}

      <Link href="/candidates-dashboard/my-profile">
        <button
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
        >
          Job Post
        </button>
      </Link>
    </div>
  </div>

  {showModal && (
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
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Register</h2>

        <form onSubmit={handleRegister}>
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
            {isLoading ? "Registering..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )}
</header>

  );
};

export default Header;
