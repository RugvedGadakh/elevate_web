'use client'

import { useState, useContext } from "react";
import { UserContext } from "@/app/layout";

const Form = () => {
  const { userId } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match!");
      return;
    }

    if (!userId) {
      setMessage("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`https://elevatebackend-l9r9.onrender.com/api/users/${userId}`, {
        method: "PUT",  // Using PUT for updating the password
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password updated successfully!");
      } else {
        setMessage(data.error || "Failed to update password.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-7 col-md-12">
          <label>Old Password</label>
          <input
            type="password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-7 col-md-12">
          <label>New Password</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-7 col-md-12">
          <label>Confirm Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Update
          </button>
        </div>

        {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}
      </div>
    </form>
  );
};

export default Form;
