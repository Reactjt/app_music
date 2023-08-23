import React, { useState } from "react";
import { logo } from "../assets";


export default function Navbar({onLogoClick}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  

  return (
    <nav className="  bg-zinc-800   shadow-md ">
      <div className="container mx-auto px-4 py-2 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <a href="#" className="flex text-lg font-semibold text-white mx-10">
            Logo
            <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 rounded-full cursor-pointer transition duration-100 hover:bg-gray-400 hover:bg-opacity-20"
            onClick={onLogoClick}
          />
          </a>
         
          <button
            onClick={toggleMenu}
            className=" md:hidden   text-white focus:outline-none "
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5.6H20V7.6H4V5.6ZM4 11.6H20V13.6H4V11.6ZM4 17.6H20V19.6H4V17.6Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5H20V7H4V5ZM4 11H20V13H4V11ZM4 17H20V19H4V17Z"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`md:flex md:items-center ${
            isMenuOpen ? "block  bg-zinc-800 " : "hidden"
          }`}
        >
          <ul className="md:flex justify-center md:space-x-8 md:mt-0 mt-4 ">
            <li>
              <a
                href="#"
                className={`block px-2 py-1 md:p-2 ${
                  isMenuOpen
                    ? "text-white   rounded-md"
                    : "text-white hover:  rounded-md"
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block px-2 py-1 md:p-2 ${
                  isMenuOpen
                    ? " text-white   rounded-md"
                    : "text-white hover:  rounded-md"
                }`}
              >
                About
              </a>
            </li>
           
            <li>
              <a
                href="#"
                className={`block px-2 py-1 md:p-2 ${
                  isMenuOpen
                    ? " text-white   rounded-md"
                    : "text-white hover: rounded-md"
                }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}



//  <img
// src={logo}
// alt="Logo"
// className="w-8 h-8 rounded-full cursor-pointer hover:bg-gray-400 hover:bg-opacity-20"
// onClick={handleSearch}
// /> 