"use client";
import { useState, useEffect } from "react";

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

  const handleLoad = (e: React.SyntheticEvent<HTMLLinkElement>) => {
    e.currentTarget.media = "all";
    console.log("Stylesheet loaded successfully");

    // Load another stylesheet if the width is greater than 768
    if (width > 768) {
      const newLink = document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.href = "/css/large-screen.css";
      newLink.media = "all";
      document.head.appendChild(newLink);
    }
  };

  return (
    <link
      rel="stylesheet"
      href="/css/responsive.css"
      media="print"
      onLoad={handleLoad}
    />
  );
};

export default ClientStyles;
