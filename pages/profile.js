import React, { useState } from 'react';
import { useEffect } from 'react';
import router,{ useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St',
    city: 'New York',
    country: 'USA',
    phone: '123-456-7890',
  });

  const handleEdit = () => {
    // Handle edit functionality here
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      
     router.push('/login');
     toast.error('Please login to continue');
    }
  }, []);

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p className="mb-2">Name: {user.name}</p>
      <p className="mb-2">Email: {user.email}</p>
      <p className="mb-2">Address: {user.address}</p>
      <p className="mb-2">City: {user.city}</p>
      <p className="mb-2">Country: {user.country}</p>
      <p className="mb-2">Phone: {user.phone}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEdit}>Edit Profile</button>
    </div>
  );
}

export default Profile;

