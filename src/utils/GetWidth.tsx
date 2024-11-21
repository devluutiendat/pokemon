"use client";

import { useState, useEffect } from "react";

// Custom hook to track screen width
export const useWidthScreen = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    // Only add the event listener on the client side
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
};

const ClientStyles: React.FC = () => {
  const width = useWidthScreen();

  useEffect(() => {
    const addStylesheet = (href: string) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.media = "all";
      document.head.appendChild(link);
    };

    // Dynamically load stylesheets based on screen width
    if (width <= 768) {
      addStylesheet("../css/responsive.css");
    }
  }, [width]); // Trigger this effect whenever `width` changes

  return null; // No need to return any JSX since styles are dynamically added
};

export default ClientStyles;
