"use client";
import React, { useState } from "react";
import Image from "next/image";
interface DescriptionsProps {
  description: string[];
}
const Descriptions: React.FC<DescriptionsProps> = ({ description }) => {
  const [desChoice, setDesChoice] = useState<number>(0);

  return (
    <div className="descript">
      <p className="name" style={{ padding: "0 3rem" }}>
        descript
      </p>
      {Array.from({ length: description.length }, (_, index) => (
        <button
          className="des"
          key={index}
          style={
            index == desChoice
              ? {
                  filter: "drop-shadow(0 0 1rem rgb(14 0 255))",
                  borderRadius: "50%",
                }
              : {}
          }
          onClick={() => setDesChoice(index)}
        >
          <Image src="/random_center_bg.webp" alt="" width={50} height={50} />
        </button>
      ))}
      <span style={{ fontSize: "x-large", margin: "3% 1%" }}>
        {description[desChoice]}
      </span>
    </div>
  );
};

export default Descriptions;
