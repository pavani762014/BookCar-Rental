import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [message, setMessage]   = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  

  const { carName, fromDate, toDate } = location.state || {};

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId") || localStorage.getItem("username");

        if (!token || !userId) {
          setMessage("Please login to view your bookings.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`https://book-car-rental-backend.onrender.com/api/auth/user/${userId}`, {
          headers: { Authorization: token }
        });

        setBookings(res.data || []);
        
      } catch (err) {
        console.error("Error fetching bookings:", err.response || err);
        setMessage("Error fetching bookings. Please try later.");
       } finally {
        setLoading(false);
        }
      
    };
    fetchBookings();
  }, []);

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border" role="status"></div>
      <p>Loading your bookings...</p>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Bookings</h2>
  
      {carName && fromDate && toDate && (
        <div className="alert alert-success shadow-sm p-4">
          <h4>✅ Thank you for booking with Car Rental!</h4>
          <p>
            You successfully booked <b>{carName}</b>
          </p>
          <p>
            📅 <b>From:</b> {fromDate} &nbsp; → &nbsp; <b>To:</b> {toDate}
          </p>
          <p className="text-muted mb-0">
            We hope you enjoy your ride! 🚗💨
          </p>
        </div>
      )}


      {message && (<div className="alert alert-warning text-center">{message}</div>)}

      {bookings.length > 0 ? (
        <div className="table-responsive mt-4">
         <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr><th>Car</th><th>Image</th><th>From</th><th>To</th><th>Booked On</th></tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.carId?.name || b.carId || "N/A"}</td>
                <td>
                  <img
                    src={b.carId?.image ? b.carId.image : `/${b.carId}.jpg`}
                    alt={b.carId?.name || "Car"}
                    width="120"
                    height="80"
                    onError={(e) => (e.target.src = "/default-car.jpg")}
                  />
                </td>
                <td>{new Date(b.startDate).toLocaleDateString()}</td>
                <td>{new Date(b.endDate).toLocaleDateString()}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
    ) : (
        !message && (
          <div className="alert alert-info text-center mt-4">
            No bookings found yet.Check the Home page to book the car.
          </div>
        )
      )}
      <div className="container mt-4 text-center"></div>
      {bookings.length > 0 && (
      <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
        Book Another Car
      </button>
    )}
    </div>
  );
};

export default Dashboard;
