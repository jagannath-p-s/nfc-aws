// src/pages/userwidgets/UserEditFormComponent.jsx
import React from "react";

const backgroundImageOptions = [
  { value: "https://coxblzsivuqumwkcfaop.supabase.co/storage/v1/object/sign/image/images/Earthtone.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZS9pbWFnZXMvRWFydGh0b25lLnBuZyIsImlhdCI6MTcxNDU2MDI0NCwiZXhwIjoyNzg2Nzg0MjQ0fQ.yqPK2eQHSo4BZDyYvDZfXenM6bSSdLUiy4rUcHfKSjE&t=2024-05-01T10%3A44%3A04.905Z", label: "Earth Tone" },
  { value: "https://img.freepik.com/premium-vector/beach-sunset-vector-art_961307-7088.jpg?size=626&ext=jpg&ga=GA1.1.1168947300.1714480985&semt=sph", label: "Option 2" },
];


const UserEditFormComponent = ({ editedFormData, setEditedFormData, isEditing }) => (
  <div className="mt-8">
    <h3 className="text-lg font-bold mb-2">Edit Your Details:</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p>
          Name:
          <input
            type="text"
            value={editedFormData.name}
            onChange={(e) =>
              setEditedFormData({
                ...editedFormData,
                name: e.target.value,
              })
            }
            disabled={!isEditing}
            className="border rounded px-2 py-1 w-full"
          />
        </p>
        <p>
          Designation:
          <input
            type="text"
            value={editedFormData.designation}
            onChange={(e) =>
              setEditedFormData({
                ...editedFormData,
                designation: e.target.value,
              })
            }
            disabled={!isEditing}
            className="border rounded px-2 py-1 w-full"
          />
        </p>
        <p>
          Phone:
          <input
            type="text"
            value={editedFormData.phone}
            onChange={(e) =>
              setEditedFormData({
                ...editedFormData,
                phone: e.target.value,
              })
            }
            disabled={!isEditing}
            className="border rounded px-2 py-1 w-full"
          />
        </p>
        <p>
          WhatsApp:
          <input
            type="text"
            value={editedFormData.whatsapp}
            onChange={(e) =>
              setEditedFormData({
                ...editedFormData,
                whatsapp: e.target.value,
              })
            }
            disabled={!isEditing}
            className="border rounded px-2 py-1 w-full"
          />
        </p>
        <p>
          Website:
          <input
            type="text"
            value={editedFormData.website}
            onChange={(e) =>
              setEditedFormData({
                ...editedFormData,
                website: e.target.value,
              })
            }
            disabled={!isEditing}
            className="border rounded px-2 py-1 w-full"
          />
        </p>
        <p>
          Drive Link:
          <input
            type="text"
            value={editedFormData.drive_link}
            onChange={(e) =>
              setEditedFormData({
                ...editedFormData,
                drive_link: e.target.value,
              })
            }
            disabled={!isEditing}
            className="border rounded px-2 py-1 w-full"
          />
        </p>
      </div>
      <div>
        <p>
          Facebook:
          <input
            type="text"
            value={editedFormData.facebook}
            onChange={(e) =>
              setEditedFormData({
                ...editedFormData,
                facebook: e.target.value,
              })
            }
            disabled={!isEditing}
            className="border rounded px-2 py-1 w-full"
          />
        </p>
        <p>
          Instagram:
          <input
            type="text"
            value={editedFormData.instagram}
            onChange={(e) =>
              setEditedFormData({
                ...editedFormData,
                instagram: e.target.value,
              })
            }
            disabled={!isEditing} className="border rounded px-2 py-1 w-full"
            />
          </p>
          <p>
            YouTube:
            <input
              type="text"
              value={editedFormData.youtube}
              onChange={(e) =>
                setEditedFormData({
                  ...editedFormData,
                  youtube: e.target.value,
                })
              }
              disabled={!isEditing}
              className="border rounded px-2 py-1 w-full"
            />
          </p>
          <p>
            LinkedIn:
            <input
              type="text"
              value={editedFormData.linkedin}
              onChange={(e) =>
                setEditedFormData({
                  ...editedFormData,
                  linkedin: e.target.value,
                })
              }
              disabled={!isEditing}
              className="border rounded px-2 py-1 w-full"
            />
          </p>
          <p>
            Google Reviews:
            <input
              type="text"
              value={editedFormData.google_reviews}
              onChange={(e) =>
                setEditedFormData({
                  ...editedFormData,
                  google_reviews: e.target.value,
                })
              }
              disabled={!isEditing}
              className="border rounded px-2 py-1 w-full"
            />
          </p>
          <p>
            Email:
            <input
              type="text"
              value={editedFormData.email}
              onChange={(e) =>
                setEditedFormData({
                  ...editedFormData,
                  email: e.target.value,
                })
              }
              disabled={!isEditing}
              className="border rounded px-2 py-1 w-full"
            />
          </p>
          <p>
            Maps:
            <input
              type="text"
              value={editedFormData.maps}
              onChange={(e) =>
                setEditedFormData({
                  ...editedFormData,
                  maps: e.target.value,
                })
              }
              disabled={!isEditing}
              className="border rounded px-2 py-1 w-full"
            />
          </p>
          <p>
              {/* Change input field to select dropdown */}
              Background Image:
              <select
                value={editedFormData.background_image}
                onChange={(e) =>
                  setEditedFormData({
                    ...editedFormData,
                    background_image: e.target.value,
                  })
                }
                disabled={!isEditing}
                className="border rounded px-2 py-1 w-full"
              >
                {/* Map over array of background image options */}
                {backgroundImageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {/* Render clickable link */}
                    <a href={option.link} target="_blank" rel="noopener noreferrer">
                      {option.label}
                    </a>
                  </option>
                ))}
              </select>
            </p>
          <p>
            Card Background Image:
            <input
              type="text"
              value={editedFormData.card_background_image}
              onChange={(e) =>
                setEditedFormData({
                  ...editedFormData,
                  card_background_image: e.target.value,
                })
              }
              disabled={!isEditing}
              className="border rounded px-2 py-1 w-full"
            />
          </p>
          <p>
            Avatar:
            <input
              type="text"
              value={editedFormData.avatar}
              onChange={(e) =>
                setEditedFormData({
                  ...editedFormData,
                  avatar: e.target.value,
                })
              }
              disabled={!isEditing}
              className="border rounded px-2 py-1 w-full"
            />
          </p>
        </div>
      </div>
    </div>
  );
  
  export default UserEditFormComponent;