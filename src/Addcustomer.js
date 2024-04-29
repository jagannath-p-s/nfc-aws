import React, { useState } from 'react';
import styled from 'styled-components';
import supabase from './supabase'; // Import the supabase client

// Styled form container
const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100%;
  width: 400px;
  margin: 0 auto;
  padding: 0 0 5px;
`;

// Styled form container
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Styled label
const Label = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
`;

// Styled input
const Input = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

// Styled submit button
const SubmitButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const InsertDataForm = () => {
  const [formData, setFormData] = useState({
    card_background_image: '',
    avatar: '',
    name: '',
    designation: '',
    phone: '',
    whatsapp: '',
    website: '',
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    google_reviews: '',
    paytm: '',
    email: '',
    maps: '',
    background_image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      card_background_image: file
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      avatar: file
    }));
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      background_image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('social_media_data').insert([formData]);
      if (error) {
        throw error;
      }
      console.log('Data inserted successfully:', data);
      // Clear form data after successful insertion
      setFormData({
        card_background_image: '',
        avatar: '',
        name: '',
        designation: '',
        phone: '',
        whatsapp: '',
        website: '',
        facebook: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        google_reviews: '',
        paytm: '',
        email: '',
        maps: '',
        background_image: ''
      });
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  };
  
  
  return (
    <Main>
      <FormContainer onSubmit={handleSubmit}>
  {/* Input fields for each column */}
  <Label>
    Card Background Image:
    <Input
      type="text"
      name="card_background_image"
      value={formData.card_background_image}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Avatar:
    <Input
      type="text"
      name="avatar"
      value={formData.avatar}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Name:
    <Input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Designation:
    <Input
      type="text"
      name="designation"
      value={formData.designation}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Phone:
    <Input
      type="text"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
    />
  </Label>
  <Label>
    WhatsApp:
    <Input
      type="text"
      name="whatsapp"
      value={formData.whatsapp}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Website:
    <Input
      type="text"
      name="website"
      value={formData.website}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Facebook:
    <Input
      type="text"
      name="facebook"
      value={formData.facebook}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Instagram:
    <Input
      type="text"
      name="instagram"
      value={formData.instagram}
      onChange={handleChange}
    />
  </Label>
  <Label>
    YouTube:
    <Input
      type="text"
      name="youtube"
      value={formData.youtube}
      onChange={handleChange}
    />
  </Label>
  <Label>
    LinkedIn:
    <Input
      type="text"
      name="linkedin"
      value={formData.linkedin}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Google Reviews:
    <Input
      type="text"
      name="google_reviews"
      value={formData.google_reviews}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Paytm:
    <Input
      type="text"
      name="paytm"
      value={formData.paytm}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Email:
    <Input
      type="text"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Maps:
    <Input
      type="text"
      name="maps"
      value={formData.maps}
      onChange={handleChange}
    />
  </Label>
  <Label>
    Background Image:
    <Input
      type="text"
      name="background_image"
      value={formData.background_image}
      onChange={handleChange}
    />
  </Label>
  <SubmitButton type="submit">Submit</SubmitButton>
</FormContainer>

    </Main>
  );
};

export default InsertDataForm;

