'use client'
import React, { useState, useEffect, useRef } from "react";
import countries from "world-countries";
import "./form.css"
import { useContext } from 'react';
import { UserContext } from "@/app/layout";
import Loader from './Loader';

const countryOptions = countries.map((country) => ({
  label: country.name.common,
  value: country.cca2,
}));

const FormInfoBox = () => {
  const { userId } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    primaryPhone: "",
    otherPhones: "",
    primaryEmail: "",
    otherEmails: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    city: "",
    currentAddress: "",
    permanentAddress: "",
    profilePicture: "",
    higherEducation: [{
      degree: "",
      specialization: "",
      collegeName: "",
      university: "",
      startYear: "",
      endYear: "",
      studyMode: "",
      aggregateType: "",
      aggregateValue: "",
    }],
    twelfthStandard: [{
      institute: "",
      specialization: "",
      board: "",
      medium: "",
      aggregateType: "",
      aggregateValue: "",
    }],
    tenthStandard: [{
      institute: "",
      board: "",
      medium: "",
      aggregateType: "",
      aggregateValue: "",
    }],
    experiences: [],
    skills: [],
    projects: [],
    socialLinks: [{
      linkedin: "",
      portfolio: "",
      social: "",
      github: "",
    }],
    preferences: [{
      jobLocation: "",
      salary: "",
      workSchedule: "",
    }],
    additionalInfo: [{
      languages: "",
      relocationWillingness: "",
      noticePeriod: "",
    }],
    backgroundCheckConsent: false,
  });

  const [invalidFields, setInvalidFields] = useState([]);
  const [logoImg, setLogoImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessing, setIsProcessing] = useState({
    save: false,
    update: false,
    delete: false
  });

  const logoImgHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoImg(file);
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };
  const handleDeletePhoto = () => {
    setLogoImg(null);
    setPreviewUrl('');
    // Reset the file input
    const fileInput = document.getElementById('upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };
  // Inside handleChange
  const handleChange = (e, field, index = null, nestedField = null) => {
    setFormData((prev) => {
      let updatedData;
      
      if (index !== null && nestedField) {
        const updatedField = [...prev[field]];
        updatedField[index] = { ...updatedField[index], [nestedField]: e.target.value };
        updatedData = { ...prev, [field]: updatedField };
      } else if (nestedField) {
        updatedData = { ...prev, [field]: { ...prev[field], [nestedField]: e.target.value } };
      } else {
        updatedData = { ...prev, [field]: e.target.value };
      }
  

      return updatedData;
    });
  };
  
  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { companyName: "", position: "", industry: "", jobType: "", startDate: "", endDate: "", responsibilities: "" }],
    }));
  };
  const handleDeleteExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };
  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { projectName: "", role: "", startDate: "", endDate: "", description: "", technologies: "", link: "" }],
    }));
  };
  const handleDeleteProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };
  const [skillInput, setSkillInput] = useState('');
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput(''); // Clear the input field
    }
  };
  const handleDeleteSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };
  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      backgroundCheckConsent: e.target.checked,
    }));
  };

  const inputRefs = useRef({});

const handleSubmit = async (e) => {
    if (!userId) {
        alert("Please Login!");
        return;
    }

    e.preventDefault();
    setIsProcessing(prev => ({ ...prev, save: true }));
    setError(null);

    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
        // Scroll to the first invalid field
        const firstErrorField = Object.keys(errors)[0];
        if (inputRefs.current[firstErrorField]) {
            inputRefs.current[firstErrorField].scrollIntoView({ behavior: "smooth", block: "center" });
            inputRefs.current[firstErrorField].focus();
        }
        setIsProcessing(prev => ({ ...prev, save: false }));
        return;
    }

    try {
        const response = await fetch(`https://elevatebackend-l9r9.onrender.com/api/users/${userId}/formDetails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        alert('Profile created successfully!');
        setIsProcessing(prev => ({ ...prev, save: false }));
    } catch (error) {
        setError(error.message);
        setIsProcessing(prev => ({ ...prev, save: false }));
    }
};

// Attach ref to inputs
const handleRef = (field) => (el) => {
    if (el) inputRefs.current[field] = el;
};


  const handleDelete = async () => {
    if (!userId) {
        alert('No form to delete.');
        return;
    }

    setIsProcessing(prev => ({ ...prev, delete: true }));
    setError(null);

    try {
        const response = await fetch(`https://elevatebackend-l9r9.onrender.com/api/users/${userId}/formDetails`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete data");

        alert("Profile deleted successfully!");

        setFormData(initialFormData);
        setFormId(null);
    } catch (error) {
        setError(error.message);
    } finally {
        setIsProcessing(prev => ({ ...prev, delete: false }));
    }
};

const handleUpdate = async () => {
  if (!userId) {
    alert('No ID provided for updating data.');
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`https://elevatebackend-l9r9.onrender.com/api/users/${userId}/formDetails`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    alert('Data updated successfully!');

    const updatedData = await response.json();
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};


  

  const [formErrors, setFormErrors] = useState({});

  const validate = (values) => {
    const errors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const phoneRegex = /^\+\d{1,3} \d{10}$/; // Matches +XX XXXXXXXXXX

    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/i;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format

    // Basic Fields
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    } else if (values.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters long';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    } else if (values.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters long';
    }

    // Phone Number Validation
    if (!values.primaryPhone) {
      errors.primaryPhone = 'Primary phone number is required';
    } else if (!phoneRegex.test(values.primaryPhone)) {
      errors.primaryPhone = 'Invalid phone number format (use +XX XXXXXXXXXX)';
    }

    if (values.otherPhones && !phoneRegex.test(values.otherPhones)) {
      errors.otherPhones = 'Invalid phone number format (use +XX XXXXXXXXXX)';
    }

    // Email Validation
    if (!values.primaryEmail) {
      errors.primaryEmail = 'Primary email is required';
    } else if (!emailRegex.test(values.primaryEmail)) {
      errors.primaryEmail = 'Invalid email';
    }

    if (values.otherEmails && !emailRegex.test(values.otherEmails)) {
      errors.otherEmails = 'Invalid email';
    }

    // Gender
    if (!values.gender) {
      errors.gender = 'Gender is required';
    }

    // Date of Birth
    if (!values.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    } else if (!dateRegex.test(values.dateOfBirth)) {
      errors.dateOfBirth = 'Invalid date format (YYYY-MM-DD)';
    }

    // Addresses
    if (!values.country) {
      errors.country = 'Country is required';
    }
    if (!values.city) {
      errors.city = 'City is required';
    }
    if (values.currentAddress && values.currentAddress.length < 2) {
      errors.currentAddress = 'Current address must be at least 2 characters long';
    }
    if (values.permanentAddress && values.permanentAddress.length < 2) {
      errors.permanentAddress = 'Permanent address must be at least 2 characters long';
    }

    // Background Check Consent
    if (values.backgroundCheckConsent !== true) {
      errors.backgroundCheckConsent = 'You must agree to the background check';
    }

    return errors;
  };

  const getLoadingMessage = () => {
    if (isProcessing.save) return "Saving your profile...";
    if (isProcessing.update) return "Updating your profile...";
    if (isProcessing.delete) return "Deleting your profile...";
    return "Processing...";
  };

  return (
    <>
      {(isProcessing.save || isProcessing.update || isProcessing.delete) && 
        <Loader message={getLoadingMessage()} />
      }
      {isSaving && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Saving data...</div>
        </div>
      )}
      {<div className="uploading-outer">
        <div className="uploadButton" style={{ marginBottom: '20px' }}>
          <input className="uploadButton-input" type="file" name="attachments[]" accept="image/*" id="upload"
            onChange={(e) => {
              handleChange(e, "profilePicture");
              logoImgHandler(e);
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <label className="upload-btn uploadButton-button ripple-effect" htmlFor="upload">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile Preview" className="img-preview" />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <span>Profile Picture</span>
                </div>
              )}
            </label>
            {previewUrl && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <label htmlFor="upload" className="label-change theme-btn btn-style-one">
                  Change
                </label>
                <button type="button" onClick={handleDeletePhoto} className="pd-btn theme-btn btn-style-three">Delete</button>
              </div>
            )}
          </div>
        </div>
        <div className="text" style={{ textAlign: 'center', marginBottom: '20px', marginLeft: '50px' }}>
          Max file size is 1MB, Minimum dimension: 330x300 And <br />
          Suitable files are .jpg & .png
        </div>
      </div>}
      <form onSubmit={handleSubmit} action="#" className="default-form p-4 space-y-4">
        <div className="row">
          {/* BASIC DETAILS */}
          <h3>Basic Details : </h3><br /><br />
          <div className="form-group col-lg-4 col-md-12">
            <label>First Name*</label>
            <input className="error-message" placeholder="first name" type="text" value={formData.firstName} name="firstName" onChange={(e) => handleChange(e, "firstName")} ref={(el) => (inputRefs.current.firstName = el)} required />
            <p style={{ color: 'red' }}>{formErrors.firstName}</p>
          </div>
          <div className="form-group col-lg-4 col-md-12">
            <label>Middle Name</label>
            <input placeholder="middle name" type="text" value={formData.middleName} name="middleName" onChange={(e) => handleChange(e, "middleName")} ref={(el) => (inputRefs.current.middleName = el)} />
            <p style={{ color: 'red' }}>{formErrors.middleName}</p>
          </div>
          <div className="form-group col-lg-4 col-md-12">
            <label>Last Name*</label>
            <input placeholder="last name" type="text" value={formData.lastName} name="lastName" onChange={(e) => handleChange(e, "lastName")} ref={(el) => (inputRefs.current.lastName = el)} required />
            <p style={{ color: 'red' }}>{formErrors.lastName}</p>
          </div>
          <div className="form-group col-lg-6 col-md-12">
            <label>Primary Phone*</label>
            <input placeholder="+xx xxxxxxxxxx" type="text" value={formData.primaryPhone} name="primaryPhone" onChange={(e) => handleChange(e, "primaryPhone")} ref={(el) => (inputRefs.current.primaryPhone = el)} required />
            <p style={{ color: 'red' }}>{formErrors.primaryPhone}</p>
          </div>
          <div className="form-group col-lg-6 col-md-12">
            <label>Other Phone Numbers</label>
            <input placeholder="+xx xxxxxxxxxx" type="text" value={formData.otherPhones} name="otherPhones" onChange={(e) => handleChange(e, "otherPhones")} ref={(el) => (inputRefs.current.otherPhones = el)} />
            <p style={{ color: 'red' }}>{formErrors.otherPhones}</p>
          </div>
          <div className="form-group col-lg-6 col-md-12">
            <label>Primary Email*</label>
            <input placeholder="example@example.com" type="email" value={formData.primaryEmail} name="primaryEmail" onChange={(e) => handleChange(e, "primaryEmail")} ref={(el) => (inputRefs.current.primaryEmail = el)} required />
            <p style={{ color: 'red' }}>{formErrors.primaryEmail}</p>
          </div>
          <div className="form-group col-lg-6 col-md-12">
            <label>Other Emails</label>
            <input placeholder="example2@example.com" type="email" value={formData.otherEmails} name="otherEmails" onChange={(e) => handleChange(e, "otherEmails")} ref={(el) => (inputRefs.current.otherEmails = el)} />
            <p style={{ color: 'red' }}>{formErrors.otherEmails}</p>
          </div>
          <div className="form-group col-lg-6 col-md-12">
            <label>Gender*</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange(e, "gender")}
              name="gender"
              ref={(el) => (inputRefs.current.gender = el)}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <p style={{ color: 'red' }}>{formErrors.gender}</p>
          </div>
          <div className="form-group col-lg-6 col-md-12">
            <label>Date of Birth*</label>
            <input className="date-box" placeholder="YYYY-MM-DD" type="date" value={formData.dateOfBirth} name="dateOfBirth" onChange={(e) => handleChange(e, "dateOfBirth")} ref={(el) => (inputRefs.current.dateOfBirth = el)} required
            />
            <p style={{ color: 'red' }}>{formErrors.dateOfBirth}</p>
          </div>
          <div className="form-group col-lg-6 col-md-12">
            <label>Country*</label>
            <select
              value={formData.country}
              onChange={(e) => handleChange(e, "country")}
              name="country"
              ref={(el) => (inputRefs.current.country = el)}
              required
            >
              <option value="">Select a country</option>
              {countryOptions.map((country, index) => (
                <option key={index} value={country.label}>
                  {country.label}
                </option>
              ))}
            </select>
            <p style={{ color: 'red' }}>{formErrors.country}</p>
          </div>
          <div className="form-group col-lg-6 col-md-12">
            <label>City*</label>
            <input type="text" value={formData.city} placeholder="mumbai,pune,..." name="city" onChange={(e) => handleChange(e, "city")} ref={(el) => (inputRefs.current.city = el)} required />
            <p style={{ color: 'red' }}>{formErrors.city}</p>
          </div>
          <div className="form-group col-lg-12 col-md-12">
            <label>Current Address</label>
            <input placeholder="09 street, ABC, XYZ..." type="text" value={formData.currentAddress} name="currentAddress" onChange={(e) => handleChange(e, "currentAddress")} ref={(el) => (inputRefs.current.currentAddress = el)} />
            <p style={{ color: 'red' }}>{formErrors.currentAddress}</p>
          </div>
          <div className="form-group col-lg-12 col-md-12">
            <label>Permanent Address</label>
            <input placeholder="09 street, ABC, XYZ..." type="text" value={formData.permanentAddress} name="permanentAddress" onChange={(e) => handleChange(e, "permanentAddress")} ref={(el) => (inputRefs.current.permanentAddress = el)} />
            <p style={{ color: 'red' }}>{formErrors.permanentAddress}</p>
          </div>
          <hr style={{ border: '0.2px solid #000', position: 'relative' }} />
          {/* EDUCATION */}
          <br /><br />
          <h2>Education</h2>


          <br /><br />
          {/* DEGREE */}
          {formData.higherEducation.map((higherEducation, index) => (
            <div key={index} className="row">
              <h3>Degree</h3><br /><br />
              <div className="form-group col-lg-6 col-md-12">
                <label>Degree</label>
                <input
                  placeholder="B.E., B.Tech., MBA, BCS ....etc"
                  type="text"
                  name="degree"
                  value={higherEducation.degree}
                  onChange={(e) => handleChange(e, "higherEducation", index, "degree")} 
                />
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>Specialization</label>
                <input
                  type="text"
                  placeholder="IT, CS, AIDS..."
                  name="specialization"
                  value={higherEducation.specialization}
                  onChange={(e) => handleChange(e, "higherEducation", index, "specialization")} 
                />
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>College Name</label>
                <input
                  placeholder="XYZ College"
                  type="text"
                  name="collegeName"
                  value={higherEducation.collegeName}
                  onChange={(e) => handleChange(e, "higherEducation", index, "collegeName")} 
                />
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>University</label>
                <input
                  placeholder="SPPU, MU, etc"
                  type="text"
                  name="university"
                  value={higherEducation.university}
                  onChange={(e) => handleChange(e, "higherEducation", index, "university")} 
                />
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>Starting Year</label>
                <input
                  placeholder="YYYY"
                  type="number"
                  name="startYear"
                  min="1900"
                  max="2030"
                  value={higherEducation.startYear}
                  onChange={(e) => handleChange(e, "higherEducation", index, "startYear")}
                />
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>End Year</label>
                <input
                  placeholder="YYYY"
                  type="number"
                  name="endYear"
                  min="1900"
                  max="2030"
                  value={higherEducation.endYear}
                  onChange={(e) => handleChange(e, "higherEducation", index, "endYear")}
                />
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>Study Mode</label>
                <select
                  value={higherEducation.studyMode}
                  onChange={(e) => handleChange(e, "higherEducation", index, "studyMode")}
                  name="studyMode"
                >
                  <option value="">Select</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>Aggregate Type</label>
                <select
                  value={higherEducation.aggregateType}
                  onChange={(e) => handleChange(e, "higherEducation", index, "aggregateType")}
                  name="aggregateType"
                >
                  <option value="">Select</option>
                  <option value="CGPA">CGPA</option>
                  <option value="Percentage">Percentage</option>
                </select>
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>Aggregate Value</label>
                <input
                  type="text"
                  value={higherEducation.aggregateValue}
                  onChange={(e) => handleChange(e, "higherEducation", index, "aggregateValue")}
                  name="aggregateValue"
                />
              </div>

            </div>
          ))}
          {/* 12th/DIPLOMA */}
          <h3>12th /Diploma</h3><br /><br />
          {formData.twelfthStandard.map((twelfthStandard, index) => (
            <div key={index} className="row">
              <div className="form-group col-lg-6 col-md-12">
                <label>Institute Name</label>
                <input
                  placeholder="XYZ College"
                  type="text"
                  name="institute"
                  value={twelfthStandard.institute}
                  onChange={(e) => handleChange(e, "twelfthStandard", index, "institute")}
                />
                
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Specialization*</label>
                <input
                  placeholder="Science , Commerce.."
                  type="text"
                  name="specialization"
                  value={twelfthStandard.specialization}
                  onChange={(e) => handleChange(e, "twelfthStandard", index, "specialization")}
                />
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Board*</label>
                <input
                  placeholder="CBSE, ICSE..."
                  type="text"
                  name="board"
                  value={twelfthStandard.board}
                  onChange={(e) => handleChange(e, "twelfthStandard", index, "board")}
                />
                
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Medium</label>
                <input
                  placeholder="English, Hindi..."
                  type="text"
                  name="medium"
                  value={twelfthStandard.medium}
                  onChange={(e) => handleChange(e, "twelfthStandard", index, "medium")}
                />
                {formErrors.twelfthStandard && formErrors.twelfthStandard[index]?.medium && (
                  <p style={{ color: 'red' }}>{formErrors.twelfthStandard[index].medium}</p>
                )}
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Aggregate Type</label>
                <select
                  value={twelfthStandard.aggregateType}
                  name="aggregateType"
                  onChange={(e) => handleChange(e, "twelfthStandard", index, "aggregateType")}
                  
                >
                  <option value="">Select</option>
                  <option value="CGPA">CGPA</option>
                  <option value="Percentage">Percentage</option>
                </select>
                
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Aggregate Value</label>
                <input
                  type="text"
                  value={twelfthStandard.aggregateValue}
                  name="aggregateValue"
                  onChange={(e) => handleChange(e, "twelfthStandard", index, "aggregateValue")}
                />
              </div>
            </div>
          ))}
          {/* 10th */}
          <h3>10th</h3><br /><br />
          {formData.tenthStandard.map((tenthStandard, index) => (
            <div key={index} className="row">
              <div className="form-group col-lg-6 col-md-12">
                <label>Institute Name</label>
                <input type="text" value={tenthStandard.institute} name="institute" onChange={(e) => handleChange(e, "tenthStandard", index, "institute")}  />
                
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Board</label>
                <input placeholder="CBSE, ICSE..." type="text" value={tenthStandard.board} name="board" onChange={(e) => handleChange(e, "tenthStandard", index, "board")}  />
                
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Medium</label>
                <input placeholder="English, Hindi..." type="text" value={tenthStandard.medium} name="medium" onChange={(e) => handleChange(e, "tenthStandard", index, "medium")}  />
                {formErrors.tenthStandard && formErrors.tenthStandard[index]?.medium && (
                  <p style={{ color: 'red' }}>{formErrors.tenthStandard[index].medium}</p>
                )}
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Aggregate Type</label>
                <select
                  value={tenthStandard.aggregateType}
                  onChange={(e) => handleChange(e, "tenthStandard", index, "aggregateType")}
                  name="aggregateType"
                  
                >
                  <option value="">Select</option>
                  <option value="CGPA">CGPA</option>
                  <option value="Percentage">Percentage</option>
                </select>
                
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Aggregate Value*</label>
                <input type="text" value={tenthStandard.aggregateValue} onChange={(e) => handleChange(e, "tenthStandard", index, "aggregateValue")} name="aggregateValue"  />
              </div>
            </div>
          ))}
          <hr style={{ border: '0.2px solid #000', position: 'relative' }} /><br /><br />
          {/* WORK EXPERIENCE */}
          <div>
            <h3>Work Experience</h3><br />
            {formData.experiences.map((experience, index) => (
              <div key={index} className="row">
                <div className="form-group col-lg-6 col-md-12">
                  <label>Company Name</label>
                  <input type="text" placeholder="Company Name" name="companyName" value={experience.companyName} onChange={(e) => handleChange(e, "experiences", index, "companyName")} />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Designation</label>
                  <input type="text" placeholder="Position" name="position" value={experience.position} onChange={(e) => handleChange(e, "experiences", index, "position")} />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Industry</label>
                  <input type="text" placeholder="IT/Finance/Sales..." name="industry" value={experience.industry} onChange={(e) => handleChange(e, "experiences", index, "industry")} />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Job Type</label>
                  <input type="text" placeholder="Full Time/Part Time/Internship/Freelance.." name="industry" value={experience.jobType} onChange={(e) => handleChange(e, "experiences", index, "jobType")} />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Start date</label>
                  <input className="date-box" type="date" placeholder="Start Date" name="startDate" value={experience.startDate} onChange={(e) => handleChange(e, "experiences", index, "startDate")} />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>End date</label>
                  <input className="date-box" type="date" placeholder="End Date" name="endDate" value={experience.endDate} onChange={(e) => handleChange(e, "experiences", index, "endDate")} />
                </div>
                <div className="form-group col-lg-12 col-md-12">
                  <label>Responsibilities</label>
                  <textarea placeholder="Responsibilities" name="responsibilities" value={experience.responsibilities} onChange={(e) => handleChange(e, "experiences", index, "responsibilities")} />
                </div>
                <button className="d-btn" type="button" onClick={() => handleDeleteExperience(index)}>Delete Experience</button>
              </div>
            ))}
            <button className="a-btn" type="button" onClick={handleAddExperience}>Add New Experience</button><br /><br />
          </div>
          <hr style={{ border: '0.2px solid #000', position: 'relative' }} /><br /><br />
        </div>
        {/* Skills Section */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Skills</label>
          <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} name="skills" placeholder="Add a skill" />
          <button className="a-btn" onClick={handleAddSkill}>Add Skill</button>
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <ul>
            {formData.skills.map((skill, index) => (
              <li key={index} className="skill-data">
                {skill} <button className="d-btn" onClick={() => handleDeleteSkill(index)}>×</button>
              </li>
            ))}
          </ul>
        </div>
        <hr style={{ border: '0.2px solid #000', position: 'relative' }} /><br />
        {/* PROJECT */}
        <div>
          <h3>Projects :</h3><br />
          {formData.projects.map((projects, index) => (
            <div key={index} className="row">
              <div className="form-group col-lg-6 col-md-12">
                <label>Project Name</label>
                <input type="text" placeholder="Project Name" name="projectName" value={projects.projectName} onChange={(e) => handleChange(e, "projects", index, "projectName")} />
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Role</label>
                <input type="text" placeholder="Role" name="role" value={projects.role} onChange={(e) => handleChange(e, "projects", index, "role")} />
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>Start Date</label>
                <input className="date-box" type="date" placeholder="Start Date" name="startDate" value={projects.startDate} onChange={(e) => handleChange(e, "projects", index, "startDate")} />
              </div>
              <div className="form-group col-lg-6 col-md-12">
                <label>End Date</label>
                <input className="date-box" type="date" placeholder="End Date" name="endDate" value={projects.endDate} onChange={(e) => handleChange(e, "projects", index, "endDate")} />
              </div>
              <div className="form-group col-lg-12 col-md-12">
                <label>Project Description</label>
                <input type="text" placeholder="Description" name="description" value={projects.description} onChange={(e) => handleChange(e, "projects", index, "description")} />
              </div>
              <div className="form-group col-lg-12 col-md-12">
                <label>Technologies used</label>
                <input type="text" placeholder="technologies" name="technologies" value={projects.technologies} onChange={(e) => handleChange(e, "projects", index, "technologies")} />

              </div>
              <div className="form-group col-lg-12 col-md-12">
                <label>Project link</label>
                <input type="text" placeholder="link" name="link" value={projects.link} onChange={(e) => handleChange(e, "projects", index, "link")} />
              </div>
              <button className="d-btn" type="button" onClick={() => handleDeleteProject(index)}>Delete Project</button>
            </div>
          ))}
          <button className="a-btn" type="button" onClick={handleAddProject}>Add New Project</button><br /><br />
        </div>
        <hr style={{ border: '0.2px solid #000', position: 'relative' }} /><br /><br />
        {/* Links */}
        <h3>Social Links : </h3><br />
        {formData.socialLinks.map((socialLinks, index) => (
          <div key={index} className="row">
            <div className="form-group col-lg-6 col-md-12">
              <label>LinkedIn</label>
              <input placeholder="www.xyz.com" type="text" value={socialLinks.linkedin} name="linkedin" onChange={(e) => handleChange(e, "socialLinks", index, "linkedin")} />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Portfolio</label>
              <input placeholder="www.xyz.com" type="text" value={socialLinks.portfolio} name="portfolio" onChange={(e) => handleChange(e, "socialLinks", index, "portfolio")} />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Social</label>
              <input placeholder="www.xyz.com" type="text" value={socialLinks.social} name="social" onChange={(e) => handleChange(e, "socialLinks", index, "social")} />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Github</label>
              <input placeholder="www.xyz.com" type="text" value={socialLinks.github} name="github" onChange={(e) => handleChange(e, "socialLinks", index, "github")} />
            </div>
          </div>
        ))}
        <hr style={{ border: '0.2px solid #000', position: 'relative' }} /><br /><br />
        {/* Additional Info */}
        <h3>Additional Info : </h3><br />
        {formData.preferences.map((preferences, index) => (
          <div key={index} className="row">
            <div className="form-group col-lg-6 col-md-12">
              <label>Job Location</label>
              <input placeholder="Pune, Mumbai, Delhi...." type="text" value={preferences.jobLocation} name="jobLocation" onChange={(e) => handleChange(e, "preferences", index, "jobLocation")} />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Expected Salary</label>
              <input placeholder="100000" type="text" value={preferences.salary} name="salary" onChange={(e) => handleChange(e, "preferences", index, "salary")} />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Work Shift</label>
              <select
                value={preferences.workSchedule} name="workSchedule" onChange={(e) => handleChange(e, "preferences", index, "workSchedule")}  >
                <option value="Day Shift">Day Shift</option>
                <option value="Night Shift">Night Shift</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>
        ))}
        {formData.additionalInfo.map((additionalInfo, index) => (
          <div key={index} className="row">
            <div className="form-group col-lg-6 col-md-12">
              <label>Languages</label>
              <input
                placeholder="English, Hindi..."
                type="text"
                value={additionalInfo.languages}
                name="languages"
                onChange={(e) => handleChange(e, "additionalInfo", index, "languages")}
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Relocation Willingness</label>
              <select value={additionalInfo.relocationWillingness} name="relocationWillingness" onChange={(e) => handleChange(e, "additionalInfo", index, "relocationWillingness")} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Notice Period</label>
              <input placeholder="3 months" type="text" value={additionalInfo.noticePeriod} name="noticePeriod" onChange={(e) => handleChange(e, "additionalInfo", index, "noticePeriod")} required />
            </div>
          </div>
        ))}
        <hr style={{ border: '0.2px solid #000', position: 'relative' }} /><br />
        <div className="form-group col-lg-6 col-md-12">
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" checked={formData.backgroundCheckConsent} name="backgroundCheckConsent" onChange={handleCheckboxChange} />
            I consent to a background check
          </label>
          <p style={{ color: 'red' }}>{formErrors.backgroundCheckConsent}</p>

        </div>
        <hr style={{ border: '0.2px solid #000', position: 'relative' }} /><br />
        <button 
          type="submit" 
          className="theme-btn btn-style-one" 
          onClick={handleSubmit}
          disabled={isProcessing.save}
        >
          {isProcessing.save ? 'Saving...' : 'Save'}
        </button>
        
        <button 
          style={{marginLeft:'10px', marginRight:'10px'}} 
          type="button" 
          className="theme-btn btn-style-three" 
          onClick={handleUpdate}
          disabled={isProcessing.update}
        >
          {isProcessing.update ? 'Updating...' : 'Update'}
        </button>
        
        <button 
          type="button" 
          className="theme-btn btn-style-two" 
          onClick={handleDelete}
          disabled={isProcessing.delete}
        >
          {isProcessing.delete ? 'Deleting...' : 'Delete'}
        </button>

      </form>
    </>
  );
};

export default FormInfoBox;