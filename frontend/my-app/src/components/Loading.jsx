// LoadingSpinner.js
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loading = ({ loading, size = 10, color = "#1d5dee" }) => {
  return (
    <div className="loading-spinner gap-3 d-flex justify-content-center align-content-center">
      <PulseLoader color={color} loading={loading} size={size} />
      {/* <h6 className="mt-3">Virtual Health Clinic</h6>*/}
      {/* <span>Loading...</span> */}
    </div>
  );
};

export default Loading;
