// SignUp.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase, { supabaseUrl } from "../supabase";
import Header from "../partials/Header";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    avatar: "",
    name: "",
    designation: "",
    phone: "",
    whatsapp: "",
    website: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    google_reviews: "",
    paytm: "",
    email: "",
    maps: "",
    background_image: "",
    password: "",
    drive_link: "",
    is_verified: false, // User is pending admin approval upon sign-up
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);

  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [redirectDelay, setRedirectDelay] = useState(1); // Countdown for redirect

  useEffect(() => {
    if (isSuccessPopupOpen) {
      const countdown = setInterval(() => {
        setRedirectDelay((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            navigate("/signin");
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isSuccessPopupOpen, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          background_image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { error } = await supabase.from("social_media_data").insert([formData]);
  
      if (error) {
        console.error("Error inserting data into Supabase:", error.message);
      } else {
        console.log("Data inserted successfully");
        setIsSuccessPopupOpen(true); // Open the success pop-up
      }
    } catch (err) {
      console.error("Error with Supabase:", err);
    }
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Unlock the Power of NFC Business Cards</h1>
              </div>

              <div className="max-w-lg mx-auto">
                <form onSubmit={handleSubmit}>
                  {/* Basic Information */}
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full sm:w-1/2 px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full sm:w-1/2 px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="designation"
                      >
                        Designation
                      </label>
                      <input
                        id="designation"
                        name="designation"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your designation"
                        value={formData.designation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Contact Information */}
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="website"
                      >
                        Website
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="Enter you website"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="whatsapp"
                      >
                        WhatsApp
                      </label>
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="WhatsApp number"
                        value={formData.whatsapp}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="facebook"
                      >
                        Facebook
                      </label>
                      <input
                        id="facebook"
                        name="facebook"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="Facebook profile"
                        value={formData.facebook}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="instagram"
                      >
                        Instagram
                      </label>
                      <input
                        id="instagram"
                        name="instagram"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="Instagram handle"
                        value={formData.instagram}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="youtube"
                      >
                        YouTube
                      </label>
                      <input
                        id="youtube"
                        name="youtube"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="YouTube channel"
                        value={formData.youtube}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="linkedin"
                      >
                        LinkedIn
                      </label>
                      <input
                        id="linkedin"
                        name="linkedin"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="LinkedIn profile"
                        value={formData.linkedin}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Additional Features */}
                  <div class="flex flex-wrap -mx-3 mb-4">
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="google_reviews"
                      >
                        Google Reviews
                      </label>
                      <input
                        id="google_reviews"
                        name="google_reviews"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="Google reviews link"
                        value={formData.google_reviews}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="paytm"
                      >
                        Paytm
                      </label>
                      <input
                        id="paytm"
                        name="paytm"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="Paytm link"
                        value={formData.paytm}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Maps and Design-Related Fields */}
                  <div class="flex flex-wrap -mx-3 mb-4">
                    <div class="w-full sm:w-1/2 px-3">
                      <label
                        class="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="maps"
                      >
                        Maps
                      </label>
                      <input
                        id="maps"
                        name="maps"
                        type="text"
                        class="form-input w-full text-gray-800"
                        placeholder="Maps link"
                        value={formData.maps}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="drive_link" // No leading space in 'drive_link'
                      >
                        Drive Link
                      </label>
                      <input
                        id="drive_link" // Corrected
                        name="drive_link" // Corrected
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your Drive link" // Improved placeholder
                        value={formData.drive_link} // Corrected variable reference
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full sm:w-1/2 px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="avatar"
                      >
                        Avatar
                      </label>
                      <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        className="form-input w-full text-gray-800"
                        onChange={handleAvatarChange}
                      />
                    </div>
             
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        type="submit"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating an account, you agree to the{" "}
                    <a className="underline" href="#0">
                      terms & conditions
                    </a>{" "}
                    and our{" "}
                    <a className="underline" href="#0">
                      privacy policy
                    </a>
                    .
                  </div>
                </form>

                <div className="text-gray-600 text-center mt-6">
                  Already using White Tap?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {isSuccessPopupOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 rounded-full border-4 border-blue-50 bg-blue-100 text-blue-500">
                <svg
                  className="w-6 h-6 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 11-8-8 8 8 0 018 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl p-2 font-bold">Sign-Up Successful!</h3>
              <h3 className="text-sm p-2 font-semibold">
                Verification pending
              </h3>
              <p className="text-gray-500 p-1">
                Redirecting to Sign-In in {redirectDelay} seconds...
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SignUp;
