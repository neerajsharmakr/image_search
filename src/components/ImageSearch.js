import React, { useState } from "react";
import axios from "axios";

const ImageSearch = ({ onSelectImage }) => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);

  const searchImages = async () => {
    let API_KEY = "_1CZzpqzEpX8MkcHxAMpJO7tdGl4W7xheF46AyNgR2U";
    const response = await axios.get(
      `https:/api.unsplash.com/search/photos?page=1&query=${search} &client_id=${API_KEY}`
    );
    setImages(response.data.results);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for images..."
      />
      <button onClick={searchImages}>Search</button>

      <div>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.thumb}
            alt={image.description}
            onClick={() => onSelectImage(image.urls.full)}
            style={{ cursor: "pointer", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
