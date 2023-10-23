import React from 'react';
import mongoose from 'mongoose';
import Order from '@/models/Order';
import { useEffect } from 'react';
import router,{ useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast';

const Orders = ({ orders }) => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          
         router.push('/login');
         toast.error('Please login to continue');
        }
      }, []);

  return (
    <div>
        <Toaster />
      <h1 className="text-3xl font-semibold tracking-wide mt-6 pt-10 ml-14">
      My Orders -
      </h1>
      <hr className="ml-14 w-44 border-b-2 border-gray-600 mt-4" />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <table className="table-auto w-full bg-white border">
            <thead>
              <tr className='bg-indigo-100'>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Order id</th>
                <th className="py-3 px-6 text-left">Qty</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">{order.date}</td>
                  <td className="py-4 px-6">{order.orderid}</td>
                  <td className="py-4 px-6">{order.quantity}</td>
                  <td className="py-4 px-6">{order.amount}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img
                        alt="order"
                        src={order.imageSrc}
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className={`ml-2 ${order.status == "Pending" ? "text-yellow-500" : (order.status == "Delivered" ? "text-green-500":"text-red-500")}`}>{order.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  let orders = await Order.find({})

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders))
    }
  }
}

export default Orders;
