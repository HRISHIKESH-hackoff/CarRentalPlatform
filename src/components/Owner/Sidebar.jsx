import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";

const Sidebar = () => {
  const location = useLocation();
  const [image, setImage] = useState("");
  const [user, setUser] = useState(dummyUserData);

  const updateImage = () => {
    if (image) {
      setUser((prev) => ({ ...prev, image: URL.createObjectURL(image) }));
      setImage("");
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full bg-blue-50 border-blue-600 text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGFChOCjtX8IRIOf3DH6EeEpKGocvBEWFRng&s"
            }
            alt="User Avatar"
            className="rounded-full w-20 h-20 object-cover"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="edit" />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex p-2 gap-1 bg-blue-300 text-blue-700 cursor-pointer"
        >
          Save <img src={assets.edit_icon} width={13} alt="save" />
        </button>
      )}

      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-blue-300/10 text-blue-700"
                : "text-gray-600"
            }`}
          >
            <img
              src={link.path === location.pathname ? link.coloredIcon : link.icon}
              alt="menu icon"
            />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${
                link.path === location.pathname && "bg-blue-200"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

