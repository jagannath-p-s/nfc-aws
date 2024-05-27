import React, { useEffect, useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import QRCode from "qrcode.react";
import supabase from "../../supabase";

function ViewUserQR({ isOpen, setIsOpen, userId }) {
  const [userName, setUserName] = useState("");
  const baseURL = "https://main.d29jfubysskuax.amplifyapp.com/";
  const fullURL = `${baseURL}${userId}`;
  const downloadRef = useRef(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data, error } = await supabase
          .from("social_media_data")
          .select("name")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user name:", error);
        } else {
          setUserName(data.name);
        }
      } catch (err) {
        console.error("An error occurred:", err);
      }
    };

    if (userId) {
      fetchUserName();
    }
  }, [userId]);

  const handleDownload = () => {
    if (downloadRef.current) {
      const canvas = downloadRef.current.querySelector("canvas");
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${userName}_QR.png`;
        link.click();
      }
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
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
              leaveFrom="opacity-100"
              leaveTo="opacity-0 translate-y-4 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                <div className="bg-white px-6 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h3 className="text-xl font-bold">{userName}'s QR Code</h3>
                  <div className="flex justify-center mt-4" ref={downloadRef}>
                    <QRCode value={fullURL} size={256} level="H" />
                  </div>
                  <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDownload}
                  >
                    Download QR Code
                  </button>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
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
  );
}

export default ViewUserQR;
