import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Cars = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedCar, fromDate, toDate } = location.state || {};

  const handleConfirmBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to confirm booking");
        return;
      }

      // decode token or get userId from localStorage if you store it there
      const userId = localStorage.getItem("userId");
      const carId = selectedCar._id;
      if (!carId) {
        alert("Missing carId — please go back and select a car again");
        return;
      }

     // console.log("carId", carId);
     console.log("Booking payload:", {
        userId,
        carId,
        startDate: fromDate,
        endDate: toDate,
      });

       await axios.post(
        "https://book-car-rental-backend.onrender.com/api/bookings/book",
        {
          userId,
          carId, // ✅ Important!
          startDate: fromDate,
          endDate: toDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking confirmed successfully!");
      navigate("/payment", { 
  state: { 
    carName: selectedCar.name,
    carImage: selectedCar.image,
    fromDate,
    toDate
  } 
});

    } catch (error) {
      console.error("Booking failed:", error);
      alert(error.response?.data?.error || "Booking failed");
    }
  };

  if (!selectedCar) {
    return <p>No car selected. Please go back and choose one.</p>;
  }

  return (
    <div className="container mt-5 text-center">
      <h2>Confirm Booking</h2>
      <img
        src={selectedCar.image}
        alt={selectedCar.name}
        style={{ width: "300px", height: "200px", objectFit: "cover" }}
      />
      <h3>{selectedCar.name}</h3>
      <p>From: {fromDate}</p>
      <p>To: {toDate}</p>
      <button className="btn btn-success" onClick={handleConfirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default Cars;
