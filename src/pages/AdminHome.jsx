// src/pages/AdminHome.jsx
import React, { useState, useEffect } from "react";
import supabase from "../supabase";
import AddUser from "./adminwidgets/AddUser";
import EditUser from "./adminwidgets/EditUser";
import ListUser from "./adminwidgets/ListUser";
import ViewUserQR from "./adminwidgets/ViewUserQR";
import ViewUserInsights from "./adminwidgets/ViewUserInsights";
import MonthFilter from "./adminwidgets/MonthFilter";
import PendingUsersList from "./adminwidgets/PendingUsersList";
import UserDetailsModal from "./adminwidgets/UserDetailsModal";

function AdminHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [isViewQRModalOpen, setIsViewQRModalOpen] = useState(false);
  const [selectedUserIdForQR, setSelectedUserIdForQR] = useState(null);
  const [isViewUserInsightsOpen, setIsViewUserInsightsOpen] = useState(false);
  const [selectedUserIdForInsights, setSelectedUserIdForInsights] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [selectedUserForDetails, setSelectedUserForDetails] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("social_media_data").select("*");
        if (error) {
          setError("Error fetching users");
        } else {
          setUsers(data);
          setFilteredUsers(data.filter((user) => user.is_verified));
          setPendingUsers(data.filter((user) => !user.is_verified));
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    const subscription = supabase
      .channel("realtime:public:social_media_data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "social_media_data" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setUsers((prevUsers) => [...prevUsers, payload.new]);
            if (!payload.new.is_verified) {
              setPendingUsers((prevPending) => [...prevPending, payload.new]);
            } else {
              setFilteredUsers((prevFiltered) => [...prevFiltered, payload.new]);
            }
          } else if (payload.eventType === "UPDATE") {
            setUsers(
              prevUsers.map((user) => (user.id === payload.new.id ? payload.new : user))
            );
            if (payload.new.is_verified) {
              setPendingUsers(
                prevPending.filter((user) => user.id !== payload.new.id)
              );
              setFilteredUsers((prevFiltered) => [...prevFiltered, payload.new]);
            } else {
              setFilteredUsers(
                prevFiltered.filter((user) => user.id !== payload.new.id)
              );
            }
          } else if (payload.eventType === "DELETE") {
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== payload.old.id)
            );
            setPendingUsers((prevPending) =>
              prevPending.filter((user) => user.id !== payload.old.id)
            );
            setFilteredUsers((prevFiltered) =>
              prevFiltered.filter((user) => user.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      const { error } = await supabase
        .from("social_media_data")
        .insert([newUser]);
      if (error) {
        setError("Error adding user");
      } else {
        setIsAddUserModalOpen(false);
      }
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  const handleEditUser = async (updatedUserData) => {
    try {
      const { error } = await supabase
        .from("social_media_data")
        .update(updatedUserData)
        .eq("id", selectedUserForEdit.id);
      if (error) {
        setError("Error updating user");
      } else {
        setIsEditUserModalOpen(false);
        setSelectedUserForEdit(null);
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const { error } = await supabase
        .from("social_media_data")
        .delete()
        .eq("id", userId);
      if (error) {
        setError("Error deleting user");
      } else {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setPendingUsers((prevPending) =>
          prevPending.filter((user) => user.id !== userId)
        );
      }
    } catch (err) {
      console.error("An error occurred. Please try again.");
    }
  };

  const handleViewQR = (userId) => {
    setSelectedUserIdForQR(userId);
    setIsViewQRModalOpen(true);
  };

  const handleMonthFilterChange = (selectedMonth) => {
    if (selectedMonth === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        const userMonth = new Date(user.created_at).toLocaleString("en-US", {
          month: "long",
        });
        return userMonth === selectedMonth;
      });
      setFilteredUsers(filtered);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUserForDetails(user);
    setIsUserDetailsModalOpen(true);
  };

  const handleViewInsights = (userId) => {
    setSelectedUserIdForInsights(userId);
    setIsViewUserInsightsOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Home</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 bg-white shadow-lg rounded">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>

        <MonthFilter onMonthChange={handleMonthFilterChange} />

        <PendingUsersList
          pendingUsers={pendingUsers}
          onViewDetails={handleViewDetails}
        />

        <AddUser
          isOpen={isAddUserModalOpen}
          setIsOpen={setIsAddUserModalOpen}
          handleAddUser={handleAddUser}
        />

        {isEditUserModalOpen && (
          <EditUser
            isOpen={isEditUserModalOpen}
            setIsOpen={setIsEditUserModalOpen}
            users={users}
            handleEditUser={handleEditUser}
            selectedUserForEdit={selectedUserForEdit}
            setSelectedUserForEdit={setSelectedUserForEdit}
          />
        )}

        <ViewUserQR
          isOpen={isViewQRModalOpen}
          setIsOpen={setIsViewQRModalOpen}
          userId={selectedUserIdForQR}
        />

        {isUserDetailsModalOpen && selectedUserForDetails && (
          <UserDetailsModal
            isOpen={isUserDetailsModalOpen}
            setIsOpen={setIsUserDetailsModalOpen}
            user={selectedUserForDetails}
            onVerify={() => {
              const updatedUser = {
                ...selectedUserForDetails,
                is_verified: true,
              };
              supabase
                .from("social_media_data")
                .update(updatedUser)
                .eq("id", selectedUserForDetails.id)
                .then(() => {
                  setIsUserDetailsModalOpen(false);
                });
            }}
          />
        )}

        {isViewUserInsightsOpen && (
          <ViewUserInsights
            isOpen={isViewUserInsightsOpen}
            setIsOpen={setIsViewUserInsightsOpen}
            userId={selectedUserIdForInsights}
          />
        )}

        <ListUser
          users={filteredUsers}
          handleDeleteUser={handleDeleteUser}
          handleViewQR={handleViewQR}
          setSelectedUserForEdit={setSelectedUserForEdit}
          setIsEditUserModalOpen={setIsEditUserModalOpen}
          setIsViewUserInsightsOpen={setIsViewUserInsightsOpen}
          setSelectedUserIdForInsights={setSelectedUserIdForInsights}
        />
      </main>
    </div>
  );
}

export default AdminHome;