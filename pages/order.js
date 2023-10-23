import React, { useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([
    {
      name: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
      address: "123 Main Street",
      city: "New York",
      zipCode: "10001",
      cartItems: [
        {
          name: "Product 1",
          image:
            "https://example.com/product1.jpg", // Replace with actual image URL
          qty: 2,
          price: 25.99,
        },
        {
          name: "Product 2",
          image:
            "https://example.com/product2.jpg", // Replace with actual image URL
          qty: 1,
          price: 14.99,
        },
      ],
      totalItems: 3,
      subTotal: 66.97,
    },
    {
      name: "Jane Smith",
      phone: "987-654-3210",
      email: "jane@example.com",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      zipCode: "90001",
      cartItems: [
        {
          name: "Product 3",
          image:
            "https://example.com/product3.jpg", // Replace with actual image URL
          qty: 3,
          price: 9.99,
        },
      ],
      totalItems: 3,
      subTotal: 29.97,
    },
  ]);

  const handleTrackOrder = (orderId) => {
    // Simulate the tracking process here
    console.log(`Tracking order with ID: ${orderId}`);
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold italic mt-10">Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-lg font-semibold">No orders yet</h2>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto my-4 p-4">
          {orders.map((order, index) => (
            <div key={index} className="mb-8 border rounded p-4">
              <h2 className="text-2xl font-bold">Order {index + 1}</h2>
              <p>Name: {order.name}</p>
              <p>Phone: {order.phone}</p>
              <p>Email: {order.email}</p>
              <p>Address: {order.address}</p>
              <p>City: {order.city}</p>
              <p>Zip Code: {order.zipCode}</p>
              <h3 className="mt-4 font-bold">Order Items:</h3>
              {order.cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-6 mt-3">
                  <div className="w-16 h-16 rounded-md border border-black px-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-grow flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <div className="flex items-center space-x-2">
                        <h2>x{item.qty}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {/* Add other item details, e.g., price */}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <h2 className="font-bold">Total Items: {order.totalItems}</h2>
              </div>
              <div className="flex justify-end">
                <h2 className="font-bold">SubTotal: ₹{order.subTotal}</h2>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleTrackOrder(index + 1)}
                >
                  Track Order
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  // Add logic to cancel the order (if needed)
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Order;
