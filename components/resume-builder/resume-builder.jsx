'use client';

import React, { useState, useEffect, useContext } from 'react';

import "../../public/scss/resumebuilder.scss";
import Editor from "../ResumeBuilder/Editor"
import DefaulHeader from '../header/DefaulHeader';
import MobileMenu from '../header/MobileMenu';
import FooterDefault from "../footer/common-footer";

const ResumeBuilder = () => {
  
  return (
    <>
      <span className="header-span">
        <DefaulHeader />
        <MobileMenu />
      </span>
      

      <div >
        <Editor/>
      </div>
      <hr />

      <FooterDefault />
    </>
  );
};

export default ResumeBuilder;