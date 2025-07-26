import { useState } from "react";
import axios from "axios";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bookings", formData);
      alert("Booking submitted!");
    } catch (error) {
      alert("Error submitting booking.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>

      <input name="name" onChange={handleChange} value={formData.name}
        className="border rounded px-3 py-2 w-full mb-4" placeholder="Full Name" required />

      <input name="email" onChange={handleChange} value={formData.email}
        className="border rounded px-3 py-2 w-full mb-4" placeholder="Email Address" type="email" required />

      <select name="service" onChange={handleChange} value={formData.service}
        className="border rounded px-3 py-2 w-full mb-4" required>
        <option value="">Select a Service</option>
        <option value="facial">Facial</option>
        <option value="massage">Massage</option>
        <option value="hair">Hair Styling</option>
        <option value="skincare">Skin Care</option>
      </select>

      <input name="date" onChange={handleChange} value={formData.date}
        className="border rounded px-3 py-2 w-full mb-4" type="date" required />

      <input name="time" onChange={handleChange} value={formData.time}
        className="border rounded px-3 py-2 w-full mb-4" type="time" required />

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit Booking
      </button>
    </form>
  );
}
