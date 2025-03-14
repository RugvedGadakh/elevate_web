"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  blogItems,
  resumeBuilderItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild, 
} from "../../utils/linkActiveChecker";

const HeaderNavContent = () => {
  const pathname = usePathname(); // Store pathname in a variable

  return (
    <nav className="nav main-menu">
      <ul className="navigation" id="navbar">
        <li className={`${isActiveParent(homeItems, pathname) ? "current" : ""} dropdown`}>
          <Link href="/home">Home</Link> 
        </li>
        <li>
          <Link href="/about">About us</Link>
        </li>
        <li className={`${isActiveParentChaild(resumeBuilderItems, pathname) ? "current" : ""} dropdown`}>
          <Link href="/resumebuilder">Resume Builder</Link>
        </li>
        <li>
          <Link href="/contact">Contact us</Link>
        </li>

        
      </ul>
    </nav>
  );
};

export default HeaderNavContent;
