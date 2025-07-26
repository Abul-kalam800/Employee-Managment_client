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
      <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center pb-5 border-dotted border-b-4 border-blue-500 md:w-6/12 mx-auto p-2">Visitor Messages</h2>
      <p className="text-center mx-auto mb-10">This is admin message section here all message will be show who send message for admin.Admin can see all mesage</p>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} className="border rounded p-3 mb-3 bg-green-200 hover:bg-green-500 duration-300">
            <p>
              <strong>Email:</strong> {msg.email}
            </p>
            <p>
              <strong>Message:</strong> {msg.message}
            </p>
            <p className="text-sm text-black">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminMessage;
