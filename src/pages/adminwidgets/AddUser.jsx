//AdddUser.jsx
import React, { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

function AddUser({ isOpen, setIsOpen, handleAddUser }) {
  const cancelButtonRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    phone: "",
    website: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    google_reviews: "",
    paytm: "",
    maps: "",
    card_background_image: "",
    avatar: "",
    background_image: "",
    drive_link: "",
  });

  const [alertMessage, setAlertMessage] = useState(null); // Alert message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddUser(formData);
      setAlertMessage({
        type: "success",
        message: "User added successfully!",
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        designation: "",
        phone: "",
        website: "",
        whatsapp: "",
        facebook: "",
        instagram: "",
        youtube: "",
        linkedin: "",
        google_reviews: "",
        paytm: "",
        maps: "",
        card_background_image: "",
        avatar: "",
        background_image: "",
        drive_link: "",
      });

      setIsOpen(false); // Close the modal after successful addition
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: "An error occurred while adding the user. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null); // Clear the alert after 3 seconds
      }, 3000); // 3 seconds delay

      return () => clearTimeout(timer); // Cleanup timer if alert changes or component unmounts
    }
  }, [alertMessage]);

  const closeAlert = () => {
    setAlertMessage(null); // Clears the alert manually
  };

  return (
    <div>
      {alertMessage && (
        <div
          role="alert"
          className={`rounded-xl border p-4 ${
            alertMessage.type === "success"
              ? "border-green-100 bg-green-50"
              : "border-red-100 bg-red-50"
          }`}
        >
          <div className="flex items-start gap-4">
            <span
              className={`text-${
                alertMessage.type === "success" ? "green" : "red"
              }-600`}
            >
              {alertMessage.type === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 a9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </span>
            <div className="flex-1">
              <strong className="block font-medium text-gray-900">
                {alertMessage.message}
              </strong>
            </div>
            <button
              className="text-gray-500 transition hover:text-gray-600"
              onClick={closeAlert}
            >
              <span className="sr-only">Dismiss alert</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                  <div className="bg-white px-6 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <h3 className="text-xl font-bold">Add New User</h3>

                    <form
                      onSubmit={handleSubmit}
                      className="grid grid-cols-2 gap-4"
                    >
                      {/* Input fields */}
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                        required
                      />
                      {/* Remaining input fields */}
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                        required
                      />

                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                        required
                      />

                      {/* Add remaining input fields, including all the fields you listed previously */}
                      <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      {/* Remaining fields */}
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="website"
                        placeholder="Website"
                        value={formData.website}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="whatsapp"
                        placeholder="WhatsApp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="facebook"
                        placeholder="Facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="instagram"
                        placeholder="Instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="youtube"
                        placeholder="YouTube"
                        value={formData.youtube}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="google_reviews"
                        placeholder="Google Reviews"
                        value={formData.google_reviews}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="paytm"
                        placeholder="Paytm"
                        value={formData.paytm}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />
                      <input
                        type="text"
                        name="drive_link"
                        placeholder="Drive link"
                        value={formData.drive_link}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="maps"
                        placeholder="Maps"
                        value={formData.maps}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="card_background_image"
                        placeholder="Card Background Image"
                        value={formData.card_background_image}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="avatar"
                        placeholder="Avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />

                      <input
                        type="text"
                        name="background_image"
                        placeholder="Background Image"
                        value={formData.background_image}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </form>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default AddUser;
