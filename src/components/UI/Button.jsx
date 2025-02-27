import { useState } from "react";

const Button = ({ text, width, height,onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={onClick} 
      style={{ 
        width, 
        height, 
        backgroundColor: "var(--main-green-color)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "transform 0.2s",
        transform: isHovered ? "scale(1.01)" : "scale(1)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </div>
  );
};

export default Button