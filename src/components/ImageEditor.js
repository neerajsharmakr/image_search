import React, { useState, useRef, useEffect } from "react";

const ImageEditor = ({ imageUrl }) => {
  const [caption, setCaption] = useState("");
  const [shapes, setShapes] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageUrl;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    };
  }, [imageUrl]);

  const addRectangle = () => {
    setShapes([
      ...shapes,
      { type: "rectangle", x: 50, y: 50, width: 100, height: 50 },
    ]);
  };

  const addCircle = () => {
    setShapes([...shapes, { type: "circle", x: 150, y: 150, radius: 50 }]);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(caption, 50, 50);

    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color || "red";
      if (shape.type === "rectangle") {
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);

        ctx.fill();
      }
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "edited-image.png";
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add caption"
      />
      <button onClick={addRectangle}>Add Rectangle</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={downloadImage}>Download</button>
    </div>
  );
};

export default ImageEditor;
