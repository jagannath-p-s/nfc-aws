// src/pages/userwidgets/HeaderComponent.jsx
import React from "react";

const HeaderComponent = ({ title }) => (
  <header className="bg-gray-800 text-white py-4">
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  </header>
);

export default HeaderComponent;
