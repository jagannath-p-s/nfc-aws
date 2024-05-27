//  EditUser.jsx
import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

function EditUser({
  isOpen, // Boolean to control dialog visibility
  setIsOpen, // Function to close the dialog
  users, // List of users to select from
  handleEditUser, // Function to handle editing
  selectedUserForEdit, // The user currently being edited
  setSelectedUserForEdit, // Function to set the selected user
}) {
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

  useEffect(() => {
    if (selectedUserForEdit && Array.isArray(users)) {
      const selectedUser = users.find(
        (user) => user.id === selectedUserForEdit.id
      );
      if (selectedUser) {
        setFormData(selectedUser);
      }
    }
  }, [selectedUserForEdit, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditUser(formData);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setIsOpen(false)} // Close when outside is clicked
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
              leaveTo="opacity-0 translate-y-4 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                <div className="bg-white px-6 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h3 className="text-xl font-bold">Edit User</h3>

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
                    />

                    {/* Remaining input fields */}
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border rounded px-3 py-2 w-full"
                    />

                    {/* Remaining fields */}
                    <input
                      type="text"
                      name="designation"
                      placeholder="Designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="website"
                      placeholder="Website"
                      value={formData.website}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="whatsapp"
                      placeholder="WhatsApp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="facebook"
                      placeholder="Facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="instagram"
                      placeholder="Instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="youtube"
                      placeholder="YouTube"
                      value={formData.youtube}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="linkedin"
                      placeholder="LinkedIn"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="google_reviews"
                      placeholder="Google Reviews"
                      value={formData.google_reviews}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="paytm"
                      placeholder="Paytm"
                      value={formData.paytm}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="maps"
                      placeholder="Maps"
                      value={formData.maps}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="card_background_image"
                      placeholder="Card Background Image"
                      value={formData.card_background_image}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="avatar"
                      placeholder="Avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="background_image"
                      placeholder="Background Image"
                      value={formData.background_image}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <input
                      type="text"
                      name="drive_link"
                      placeholder="Drive Link"
                      value={formData.drive_link}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />

                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                  </form>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setIsOpen(false)} // Close the modal
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
  );
}

export default EditUser;
