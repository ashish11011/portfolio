"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const NavBar = (params: any) => {
  const { isDarkMode, setIsDarkMode } = params;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [toMaxWidth, setToMaxWidth] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
      if (scrollY > 50) {
        setToMaxWidth(false);
      } else {
        setToMaxWidth(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="backdrop-blur fixed top-0 left-1/2 -translate-x-1/2 w-full z-50">
      <div
        className={` ${
          !toMaxWidth ? "max-w-3xl" : "max-w-4xl"
        }  w-full duration-300 transition-all justify-between mx-auto pt-10 flex gap-4 py-4 px-4 sm:px-0 `}
      >
        {/* <div
          className=" px-4 py-2 bg-white dark:bg-darkColor rounded-3xl border dark:border-green-500 hover:border-green-500  cursor-pointer flex justify-center items-center hover:scale-105 duration-200 "
          onClick={() => {
            setIsDarkMode(!isDarkMode);
          }}
        >
          {!isDarkMode ? (
            <Sun
              className=" stroke-black dark:fill-white dark:stroke-white"
              size={16}
            />
          ) : (
            <Moon className="dark:stroke-white" size={16} />
          )}
        </div> */}
        <div className=" ml-auto bg-white dark:bg-darkColor h-fit flex justify-center items-center overflow-hidden rounded-3xl border px-3">
          <Link
            href="/"
            className=" cursor-pointer text-gray-600 py-2 px-3 duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white text-sm font-semibold"
          >
            Home
          </Link>
          <div
            onClick={() => {
              const projects = document.getElementById("projects");
              if (projects) {
                const offsetTop =
                  projects.getBoundingClientRect().top + window.scrollY - 150;
                window.scrollTo({ top: offsetTop, behavior: "smooth" });
              }
            }}
            className=" cursor-pointer text-gray-600 py-2 px-3 duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white text-sm font-semibold"
          >
            Projects
          </div>
          <div
            onClick={() => {
              const experience = document.getElementById("experience");
              if (experience) {
                const offsetTop =
                  experience.getBoundingClientRect().top + window.scrollY - 150;
                window.scrollTo({ top: offsetTop, behavior: "smooth" });
              }
            }}
            className=" cursor-pointer text-gray-600 py-2 px-3 duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white text-sm font-semibold"
          >
            Experience
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
