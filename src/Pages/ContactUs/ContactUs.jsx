import React, { useState } from "react";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const axioesInstance = useAxios();

  const messageData = {
    email,
    message,
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactRes = await axioesInstance.post(
        "/sendmessages",
        messageData
      );
      setSuccess(" ");
      setEmail(" ");
      setMessage(" ");
      if (contactRes.data.result.insertedId) {
        Swal.fire({
          position: "top-center",
          title: "Your message successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch {
      (error) => {
        console.log(error.message);
      };
    }
  };
  return (
    <div className="max-w-xl mx-auto my-5 rounded-2xl p-5 bg-blue-100">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-4"> 451 street Industral area, Doha City, Qatar</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          required
          value={message}
          placeholder="Your message"
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full rounded h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Send Message
        </button>
      </form>

      {success && <p className="mt-4 text-green-600">{success}</p>}
    </div>
  );
};

export default ContactUs;
