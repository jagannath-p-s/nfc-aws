import React, { useEffect, useState } from "react";
import supabase from "../../supabase";

function ListUser({
  users,
  handleViewQR,
  setSelectedUserForEdit,
  setIsEditUserModalOpen,
  setIsViewUserInsightsOpen,
  setSelectedUserIdForInsights,
}) {
  const [totalUsers, setTotalUsers] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const { count, error } = await supabase
          .from("social_media_data")
          .select("*", { count: "exact" });
        if (error) {
          console.error("Error fetching total users:", error);
        } else {
          setTotalUsers(count);
          setVerifiedUsers(users.filter((user) => user.is_verified));
        }
      } catch (error) {
        console.error("An error occurred while fetching total users:", error);
      }
    };

    fetchTotalUsers(); // Fetch total users on component mount
  }, [users]);

  const handleDeleteUser = (userId) => {
    setUserToDelete(users.find((user) => user.id === userId));
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const { error } = await supabase
        .from("social_media_data")
        .delete()
        .eq("id", userToDelete.id);
      if (error) {
        console.error("Error deleting user:", error);
      } else {
        setVerifiedUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userToDelete.id)
        );
      }
    } catch (err) {
      console.error("An error occurred while deleting the user:", err);
    } finally {
      setShowDeleteConfirmation(false);
      setUserToDelete(null);
    }
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  return (
    <div className="text-gray-900 p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-3xl">Current Users:</h4>
        <span className="text-lg text-gray-700">
          <strong>Total Users:</strong> {totalUsers}
        </span>
      </div>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Do you want to delete the user {userToDelete?.name}?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                onClick={confirmDeleteUser}
              >
                Delete
              </button>
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded"
                onClick={cancelDeleteUser}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Designation</th>
              <th className="text-left p-3 px-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {verifiedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-orange-100 bg-gray-100"
              >
                <td className="p-3 px-5 flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {user.name}
                </td>
                <td className="p-3 px-5">{user.designation}</td>
                <td className="p-3 px-5 flex justify-end">
                  <button
                    type="button"
                    className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => {
                      setSelectedUserForEdit(user);
                      setIsEditUserModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleViewQR(user.id)}
                  >
                    View QR
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => {
                      setSelectedUserIdForInsights(user.id);
                      setIsViewUserInsightsOpen(true);
                    }}
                  >
                    View Insights
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUser;