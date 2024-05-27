// src/pages/userwidgets/UserProfileComponent.jsx
import React from "react";

const UserProfileComponent = ({ userData }) => (
  <div className="mt-8">
    <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
      Your Details
    </h3>

    <div className="overflow-x-auto bg-white p-6 border rounded shadow-lg">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-gray-600">Field</th>
            <th className="p-3 text-gray-600">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 text-lg text-gray-700">Name:</td>
            <td className="p-3 text-lg text-gray-700">{userData.name}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Designation:</td>
            <td className="p-3 text-lg text-gray-700">
              {userData.designation}
            </td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Phone:</td>
            <td className="p-3 text-lg text-gray-700">{userData.phone}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">WhatsApp:</td>
            <td className="p-3 text-lg text-gray-700">{userData.whatsapp}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Website:</td>
            <td className="p-3 text-lg text-gray-700">{userData.website}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Drive Link:</td>
            <td className="p-3 text-lg text-gray-700">{userData.drive_link}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Avatar:</td>
            <td className="p-3 text-lg text-gray-700 flex items-center">
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-16 h-16 rounded-full"
              />
            </td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Facebook:</td>
            <td className="p-3 text-lg text-gray-700">{userData.facebook}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Instagram:</td>
            <td className="p-3 text-lg text-gray-700">{userData.instagram}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">YouTube:</td>
            <td className="p-3 text-lg text-gray-700">{userData.youtube}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">LinkedIn:</td>
            <td className="p-3 text-lg text-gray-700">{userData.linkedin}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Google Reviews:</td>
            <td className="p-3 text-lg text-gray-700">
              {userData.google_reviews}
            </td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Paytm:</td>
            <td className="p-3 text-lg text-gray-700">{userData.paytm}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Email:</td>
            <td className="p-3 text-lg text-gray-700">{userData.email}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Maps:</td>
            <td className="p-3 text-lg text-gray-700">{userData.maps}</td>
          </tr>
          <tr>
            <td className="p-3 text-lg text-gray-700">Background Image:</td>
            <td className="p-3 text-lg text-gray-700 flex items-center">
              <img
                src={userData.background_image}
                alt="Background"
                className="w-16 h-16 rounded"
              />
            </td>
          </tr>
     
        </tbody>
      </table>
    </div>
  </div>
);

export default UserProfileComponent;
