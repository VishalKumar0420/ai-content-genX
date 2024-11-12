import React, { useEffect, useRef, useState } from "react";
import { userLogout } from "../../apis/apiServices";
import { logout } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {userInfo,token}=useSelector((state)=>state.user);
  
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: userLogout,
    onSuccess: (data) => {
      dispatch(
        logout({
          token: null,
          userInfo: data.data,
        })
      );
      navigation('/');
      toast.success("Successfully Logout out!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.errors?.[0] || "Logout failed. Please try again."
      );
      console.error("Login Error:", error.message);
    },
  });

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    mutate(token); 
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <div
          className="bg-green-500 text-white w-10 h-10 flex justify-center items-center rounded-full"
          onClick={toggleDropdown}
        >
          <span>{userInfo?.username.slice(0,2).toUpperCase()}</span>
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <p
              className="block px-4 py-2 text-sm text-gray-700"
           
            >
              Account settings
            </p>
            <p
              className="block px-4 py-2 text-sm text-gray-700"
          
            >
              {userInfo?.username}
            </p>
            <p
              className="block px-4 py-2 text-sm text-gray-700 border-b-2"
              role="menuitem"
              id="menu-item-2"
            >
              {userInfo?.email}
            </p>

              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                role="menuitem"
                id="menu-item-3"
                onClick={handleSignOut}
                disabled={isPending}
              >
                {isPending ? "Signing out..." : "Sign out"}
              </button>
          </div>
        </div>
      )}
    </div>
  );
}
