
"use client"
import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="cursor-pointer grid place-items-center mr-2" onClick={toggleTheme}>
      {theme === "dark" ? (
        <MdSunny className="" size={24} />
      ) : (
        <FaMoon className="" size={24} />
      )}
    </div>
  );
};

export default ThemeToggle;