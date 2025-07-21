import React from "react";
import useAxios from "../../Hook/useAxios";
import { useQuery } from '@tanstack/react-query';
import LoadingSpnieer from "../../Pages/spinnerPage/LoadingSpnieer";

const AdminMessage = () => {
 const axioesInstance = useAxios();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["adminmessage"],
    queryFn: async () => {
      const res = await axioesInstance.get("/adminmessage");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpnieer></LoadingSpnieer>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Visitor Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} className="border rounded p-3 mb-3">
            <p>
              <strong>Email:</strong> {msg.email}
            </p>
            <p>
              <strong>Message:</strong> {msg.message}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminMessage;
