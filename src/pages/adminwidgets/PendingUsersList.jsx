// src/pages/adminwidgets/PendingUsersList.jsx
import React, { useEffect, useState } from "react";
import supabase from "../../supabase";

function PendingUsersList({ onViewDetails }) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("social_media_data")
          .select("*")
          .eq("is_verified", false);

        if (error) {
          setError("Error fetching pending users.");
        } else {
          setPendingUsers(data);
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers(); // Fetch pending users initially

    // Realtime listener for pending users
    const subscription = supabase
      .channel("realtime:public:social_media_data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "social_media_data" },
        (payload) => {
          if (payload.eventType === "INSERT" && !payload.new.is_verified) {
            setPendingUsers((prevPending) => [...prevPending, payload.new]);
          } else if (
            payload.eventType === "UPDATE" &&
            payload.new.is_verified
          ) {
            setPendingUsers((prevPending) =>
              prevPending.filter((user) => user.id !== payload.new.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe(); // Cleanup listener on component unmount
    };
  }, []);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Pending User Verifications</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Sign-Up Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  {new Date(user.created_at).toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                    onClick={() => onViewDetails(user)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PendingUsersList;
