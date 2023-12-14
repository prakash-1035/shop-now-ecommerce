import React from "react";

const Loader = () => {
  return (
    <div className="container w-100 loader">
      <div className="spinner-grow text-dark mb-4" role="status">
        <span className="sr-only"></span>
      </div>
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
