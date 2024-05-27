// src/pages/adminwidgets/UserDetailsModal.jsx
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import supabase from "../../supabase";

function UserDetailsModal({ isOpen, setIsOpen, user, onUserVerified }) {
  const handleVerifyUser = async () => {
    try {
      const { error } = await supabase
        .from("social_media_data")
        .update({ is_verified: true })
        .eq("id", user.id);

      if (error) {
        console.error("Error verifying user:", error);
      } else {
        onUserVerified(user); // Notify that user is verified
        setIsOpen(false); // Close the modal
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <h3 className="text-xl font-bold">User Details</h3>

                  <div className="mt-4">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p>
                      <strong>Designation:</strong> {user.designation}
                    </p>
                    <p>
                      <strong>Sign-Up Date:</strong> {new Date(user.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleVerifyUser}
                    >
                      Verify User
                    </button>
                    <button
                      className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default UserDetailsModal;
