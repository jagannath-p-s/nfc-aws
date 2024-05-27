import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import BackgroundImageComponent from "./BackgroundImageComponent";
import ProfileCardComponent from "./ProfileCardComponent";
import SocialMediaComponent from "./SocialMediaComponent";
import supabase from "../../supabase"; // Import supabase
import socialMediaUrls from "./socialMediaUrls"; // Import socialMediaUrls

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* Add this to make sure BackgroundImageComponent covers the entire container */
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Customerside() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by '/'
  const userId = pathSegments[pathSegments.length - 1]; // Get the last segment as userId
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("social_media_data")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          setError("Error fetching user data");
        } else {
          setUserData(data);
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // React to changes in userId

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
    <div>
      <CenteredContainer>
        <BackgroundImageComponent src={socialMediaUrls.backgroundImage} />{" "}
        {/* Pass the background image URL */}
        {userData && <ProfileCardComponent userData={userData} />}{" "}
        {/* Pass the userData to ProfileCardComponent */}
        {userData && <SocialMediaComponent userData={userData} />}{" "}
        {/* Pass the userData to SocialMediaComponent */}
      </CenteredContainer>
    </div>
  );
}

export default Customerside;
