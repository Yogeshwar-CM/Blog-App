import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase"; // Import auth from firebase.js

const Navbar = () => {
  const [user, setUser] = useState(null); // State to manage user authentication status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [showNewPostPopup, setShowNewPostPopup] = useState(false); // State to manage new post popup visibility
  const [newPost, setNewPost] = useState({ title: "", content: "" }); // State to manage new post form data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("blogapp_user_token", user.accessToken);
      } else {
        setUser(null);
        localStorage.removeItem("blogapp_user_token");
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        window.location.reload(); // Reload the window upon login
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const signOut = () => {
    firebaseSignOut(auth)
      .then(() => {
        setUser(null);
        setIsDropdownOpen(false); // Close dropdown on sign out
        window.location.reload(); // Reload the window upon logout
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const toggleNewPostPopup = () => {
    setShowNewPostPopup(!showNewPostPopup); // Toggle new post popup visibility
  };

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewPostSubmit = () => {
    // Trim the title and content to remove leading and trailing whitespace
    const trimmedTitle = newPost.title.trim();
    const trimmedContent = newPost.content; // No trimming for content

    // Check if title or content is empty after trimming
    if (!trimmedTitle || !trimmedContent) {
      console.error("Title or content cannot be empty");
      return;
    }

    fetch("https://blog-app-8bka.onrender.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: trimmedTitle,
        content: trimmedContent,
        author: user.displayName,
        userId: user.uid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New post added:", data);
        // Close the popup after successful submission
        setShowNewPostPopup(false);
        // Optionally, you can clear the form fields
        setNewPost({ title: "", content: "" });
        location.reload();
      })
      .catch((error) => {
        console.error("Error adding new post:", error);
      });
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white py-3 px-6">
      {/* Left Side - App Name */}
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold font-poppins">Blog App</span>
      </div>

      {/* Right Side - Icons and Profile Dropdown */}
      <div className="flex items-center space-x-4">
        {/* New Post Icon - Visible only when user is logged in */}
        {user && (
          <button
            onClick={toggleNewPostPopup}
            className="lg:block bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md"
          >
            <i className="fas fa-plus"></i>
            <span className="ml-2">New Post</span>
          </button>
        )}

        {/* Profile Picture or Google Sign-in Button */}
        {user ? (
          // User is signed in - Show profile dropdown
          <div className="relative z-50">
            {/* Profile Picture */}
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={toggleDropdown} // Toggle dropdown visibility on click
            >
              {/* Replace with profile picture */}
              <img
                src={user.photoURL || "https://via.placeholder.com/30"}
                alt="Profile"
                className="w-8 h-8 rounded-md"
              />
              <span className="hidden lg:inline-block text-sm">
                {user.displayName}
              </span>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm">
                Name: {user.displayName}
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm">
                Email: {user.email}
              </div>
              <button
                onClick={signOut}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          // User is not signed in - Show sign-in button
          <button
            onClick={signInWithGoogle}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
          >
            Sign in with Google
          </button>
        )}

        {/* New Post Popup */}
        {showNewPostPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-40">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 h-3/4 text-white overflow-auto">
              <h2 className="text-2xl font-semibold mb-4">New Post</h2>
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleNewPostChange}
                placeholder="Title"
                className="w-full px-4 py-3 mb-4 text-gray-900 bg-gray-700 border border-gray-300 rounded-md focus:outline-none text-lg"
              />
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleNewPostChange}
                placeholder="Content"
                rows="12"
                className="w-full px-4 py-3 mb-4 text-gray-900 bg-gray-700 border border-gray-300 rounded-md focus:outline-none resize-none text-lg"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleNewPostSubmit}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
                <button
                  onClick={toggleNewPostPopup}
                  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
