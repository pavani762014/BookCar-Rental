import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carName, carImage, fromDate, toDate } = location.state || {};

  if (!carName || !fromDate || !toDate) {
    return <h3 className="text-center mt-5">No booking details found!</h3>;
  }

  const handlePayment = () => {
    // after payment success redirect to /cars with success state
    alert("💳 Payment successful!");
    navigate("/dashboard", { state: {carName, fromDate, toDate } });
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Payment Page</h2>
      <div className="card shadow mt-4 p-4">
        {carImage && (
          <img
            src={carImage}
            alt={carName}
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}
      
        <h4 className="mt-3">{carName}</h4>
        <p><b>From:</b> {fromDate}</p>
        <p><b>To:</b> {toDate}</p>
        <p><b>Amount:</b> ₹5000 (dummy)</p>
      </div>
      <button className="btn btn-primary mt-3" onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
