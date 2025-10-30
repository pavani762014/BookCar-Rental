import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const carImages = [
  
  { _id: "68f7882ca8e1c3b7f48b0eec",name: "Maruti Suzuki Swift", image: "/swift.jpg" },
  { _id: "68f7896ca8e1c3b7f48b0eee",name: "Hyundai Creta", image: "/Hyundai.jpg" },
  { _id: "68f789e4a8e1c3b7f48b0eef",name: "Tata Nexon", image: "/nexon.jpg" },
  //{ _id: "68f78a2ba8e1c3b7f48b0ef0",name: "Mahindra XUV300", image: "/Mahindra XUV300.jpg" },
  { _id: "68f78ac1a8e1c3b7f48b0ef1",name: "Honda City", image: "/Hondacity.jpg" },
  { _id: "68f78b05a8e1c3b7f48b0ef2",name: "Kia Seltos", image: "/KiaSeltos.jpg" },
  //{ _id: "68f78b72a8e1c3b7f48b0ef3",name: "Toyota Innova", image: "/Toyota Innova.jpg" },
  //{ _id: "68f78bb8a8e1c3b7f48b0ef4",name: "Ford EcoSport", image: "/Ford ecosport.jpg" },
  //{ _id: "68f78c00a8e1c3b7f48b0ef5",name: "MG Hector", image: "/MG Hector.jpg" },
  { _id: "68f78c3ca8e1c3b7f48b0ef6",name: "Skoda Kushaq", image: "/Kushaq.jpg" },
  
    
];

  const Home = () => {
  const navigate = useNavigate();
  const [dates, setDates] = useState({});

  const handleDateChange = (carName, field, value) => {
    setDates(prev => ({ ...prev, [carName]: { ...(prev[carName]||{}), [field]: value } }));
  };

  const handleBook = (car) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Register / Login to book a car.");
      return;
    }

    const fromDate = dates[car.name]?.fromDate || "";
    const toDate = dates[car.name]?.toDate || "";
    if (!fromDate || !toDate) {
      alert("Please choose both from and to dates."); 
      return;
    }
    
    
navigate("/cars", { state: { selectedCar: car, fromDate, toDate } });

   
};

  return (
    <div className="container mt-4">
      <h1 className="text-center">Available Cars</h1>
      <div className="row mt-4">
        {carImages.map((car, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card">
              <img src={car.image} alt={car.name} className="card-img-top" style={{ height: 200, objectFit: "cover" }} onError={(e)=> e.target.src="/default-car.jpg"} />
              <div className="card-body">
                <h5>{car.name}</h5>
                <div className="mb-2">
                  <input type="date" className="form-control mb-1" onChange={(e)=>handleDateChange(car.name, "fromDate", e.target.value)} />
                  <input type="date" className="form-control" onChange={(e)=>handleDateChange(car.name, "toDate", e.target.value)} />
                </div>
                <button className="btn btn-primary" onClick={()=>handleBook(car)}>Book Car</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
