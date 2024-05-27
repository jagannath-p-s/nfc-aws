// src/pages/UserHome.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../supabase";
import UserProfileComponent from "./userwidgets/UserProfileComponent";
import UserEditFormComponent from "./userwidgets/UserEditFormComponent";
import ViewUserInsights from "./adminwidgets/ViewUserInsights";
import ControlButtonsComponent from "./userwidgets/ControlButtonsComponent"; // Ensure you import the ControlButtonsComponent

function UserHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const signedInUserEmail = location.state?.signedInUserEmail;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [editedFormData, setEditedFormData] = useState(userData);

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleViewCard = () => {
    const userId = userData.id;
    navigate(`/${userId}`);
  };

  const handleViewInsights = () => {
    setIsInsightsOpen(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (signedInUserEmail) {
          const { data, error } = await supabase
            .from("social_media_data")
            .select("*")
            .eq("email", signedInUserEmail)
            .single();

          if (error) {
            setError("Error fetching user data");
          } else if (data) {
            setUserData(data);
            setEditedFormData(data);
          } else {
            setError("No user data found");
          }
        } else {
          setError("User not signed in");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [signedInUserEmail]);

  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase
        .from("social_media_data")
        .update(editedFormData)
        .eq("email", signedInUserEmail);

      if (error) {
        console.error("Error updating user data:", error.message);
      } else {
        setUserData(editedFormData);
        setIsEditing(false);
        console.log("User data updated successfully");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
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

  if (!userData) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">User Home</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mt-8">
          <ControlButtonsComponent
            isEditing={isEditing}
            toggleEditing={toggleEditing}
            handleSaveChanges={handleSaveChanges}
            handleViewCard={handleViewCard}
          />
          {isEditing ? (
            <UserEditFormComponent
              editedFormData={editedFormData}
              setEditedFormData={setEditedFormData}
              isEditing={isEditing}
            />
          ) : (
            <UserProfileComponent userData={userData} />
          )}
        </div>
        <ViewUserInsights
          isOpen={isInsightsOpen}
          setIsOpen={setIsInsightsOpen}
          userId={userData.id}
        />
      </main>
    </div>
  );
}

export default UserHome;
