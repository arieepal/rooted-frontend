import { useState, useEffect } from "react";
import { getHairProfile } from "../../utils/api";
import * as api from "../../utils/api";
import "./Profile.css";
import hairGraphic from "../../assets/profile_image.png";
import placeholder from "../../assets/frame.png";

function Profile({ user }) {
  const initialPhotos = [
    { file: null, date: "" },
    { file: null, date: "" },
    { file: null, date: "" },
    { file: null, date: "" },
  ];

  const [photos, setPhotos] = useState(user?.photos || initialPhotos);
  const [hairProfile, setHairProfile] = useState(user?.hairProfile || null);

  //fake backend
  // useEffect(() => {
  //   getHairProfile().then((data) => {
  //     setHairProfile(data);
  //   });
  // }, []);

  useEffect(() => {
    if (user?.hairProfile) {
      // User already has a hair profile
      setHairProfile(user.hairProfile);
    } else {
      // Otherwise, fetch from fake backend
      getHairProfile().then((data) => {
        setHairProfile(data);

        // Also save it in the user object and localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
          u.email === user.email ? { ...u, hairProfile: data } : u,
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      });
    }
  }, [user]);

  //update app
  useEffect(() => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, photos } : u,
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }, [photos, user.email]);

  // Convert File to data URL
  const fileToDataUrl = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const handleAddOrEditPhoto = async (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Convert to data URL
      const dataUrl = await fileToDataUrl(file);

      const newPhotos = [...photos];
      newPhotos[index] = { file: dataUrl, date: newPhotos[index].date || "" };
      setPhotos(newPhotos);
    };
    fileInput.click();
  };

  const handleDateChange = (index, newDate) => {
    const newPhotos = [...photos];
    newPhotos[index].date = newDate;
    setPhotos(newPhotos);
  };

  const handleDeletePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = { file: null, date: "" };
    setPhotos(newPhotos);
  };

  if (!hairProfile) {
    return <p>Loading hair profile...</p>;
  }

  return (
    <section className="profile">
      <div className="profile__header">
        <h1>
          <strong>Welcome, {user.name}!</strong>
        </h1>
        <p>Your Hair Journey Grows With You</p>
      </div>
      <div className="profile__top">
        <div className="profile__cards">
          <div className="profile__card">
            <h3>Hair Type</h3>
            <p>{hairProfile.hairType}</p>
          </div>
          <div className="profile__card">
            <h3>Porosity</h3>
            <p>{hairProfile.porosity}</p>
          </div>
        </div>
      </div>
      {/* graphic */}
      <div className="profile__graphic">
        <img src={hairGraphic} alt="Hair Care Illusion" />
      </div>
      {/* Progress Photos */}
      <div className="profile__photos">
        <div className="profile__photos-header">
          <h2>Progress Photos</h2>
          <button
            className="profile__add-btn"
            onClick={() =>
              handleAddOrEditPhoto(photos.findIndex((p) => !p.file))
            }
          >
            + Add Photo
          </button>
        </div>
      </div>
      <div className="profile__photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <div
              className="photo-card"
              style={{ backgroundImage: `url(${placeholder})` }}
            >
              {photo.file ? (
                <>
                  <img
                    src={photo.file}
                    alt={`Hair progress ${index + 1}`}
                    onClick={() => handleAddOrEditPhoto(index)}
                    onLoad={(e) => e.currentTarget.classList.add("loaded")}
                  />

                  <button
                    className="photo-delete-btn"
                    onClick={() => handleDeletePhoto(index)}
                  >
                    ×
                  </button>
                </>
              ) : (
                <div
                  className="photo-placeholder"
                  onClick={() => handleAddOrEditPhoto(index)}
                >
                  Click & add growth photo
                </div>
              )}
            </div>

            {photo.file && (
              <input
                type="date"
                className="photo-date"
                value={photo.date}
                onChange={(e) => handleDateChange(index, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="profile__tip">
        <p>Consistency beats perfection. Small habits grow strong roots.</p>
      </div>
    </section>
  );
}

export default Profile;
