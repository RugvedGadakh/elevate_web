'use client'

import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import HeaderNavContent from "../header/HeaderNavContent";
import Image from "next/image";
import { UserContext } from "@/app/layout";
import RegisterPopup from "./RegisterPopup";
import LoginPopup from "./LoginPopup";

const Header = () => {
  const { userId, setUserId } = useContext(UserContext);
  const [navbar, setNavbar] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [setUserId]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userId");
      setUserId(null);
      alert("Logged out successfully!");
    }
  };

  return (
    <header className={`main-header alternate -type-14 ${navbar ? "fixed-header animated slideInDown" : ""}`}>
      <div className="auto-container">
        <div className="main-box">
          <div className="nav-outer">
            <div className="logo-box" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="logo">
                <Link href="/">
                  <Image width={154} height={50} src="/images/elevate_logo.png" alt="brand" />
                  <span style={{ backgroundColor:"transparent" ,border: "2px solid #0A3D62", color: "#0A3D62", padding: "2px ", borderRadius: "4px", fontSize: "12px", marginLeft: "3px"}}>Beta</span>

                </Link>
              </div>
            </div>

            <HeaderNavContent />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {userId ? (
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "transparent",
                  color: "#ff5a5f", 
                  border: "2px solid #ff5a5f",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#ff5a5f";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#ff5a5f";
                }}
              >
                Logout
              </button>
            ) : (
              <button
                id="register"
                onClick={() => { setShowRegister(true); setShowLogin(false); }}
                style={{
                  backgroundColor: "transparent",
                  color: "#0A3D62", // Dark Blue
                  border: "2px solid #0A3D62",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#0A3D62";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#0A3D62";
                }}
              >
                Login/Register
              </button>
            )}

            {userId && (
              <Link href="/myprofile">
                <button
                  style={{
                  backgroundColor: "transparent",
                  color: "#28a745", 
                  border: "2px solid #28a745",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#28a745";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#28a745";
                  }}
                >
                  My Profile
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {showRegister && <RegisterPopup setShowModal={setShowRegister} setShowLogin={setShowLogin} />}
      {showLogin && <LoginPopup setShowModal={setShowLogin} setShowRegister={setShowRegister} />}
    </header>
  );
};

export default Header;
