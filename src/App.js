import React, { useState } from "react";
import "./App.css";
import ImageSearch from "./components/ImageSearch";
import ImageEditor from "./components/ImageEditor";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <h2>Name: Neeraj Sharma</h2>
      <br />
      <h2>Email:neerajsharmanitc@gmail.com</h2>
      <div className="container">
        <h1>Image Editor</h1>
        <ImageSearch onSelectImage={setSelectedImage} />
        {selectedImage && <ImageEditor imageUrl={selectedImage} />}
      </div>
    </div>
  );
}

export default App;
