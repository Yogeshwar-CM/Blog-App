import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "./Navbar";
import Prototype from "./Prototype";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  const fetchUser = () => {
    const userToken = localStorage.getItem("blogapp_user_token");
    if (userToken) {
      try {
        const tokenPayload = JSON.parse(atob(userToken.split(".")[1]));
        const storedUser = {
          uid: tokenPayload.sub,
          displayName: tokenPayload.name,
          email: tokenPayload.email,
          // Add other fields as needed
        };
        setUser(storedUser);
      } catch (error) {
        console.error("Error decoding user token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://blog-app-8bka.onrender.com/api/posts"
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await fetch(`https://blog-app-8bka.onrender.com/api/posts/${postId}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((post) => post._id !== postId));
      closePostPopup();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openPostPopup = (post) => {
    setSelectedPost(post);
    setShowPostPopup(true);
  };

  const closePostPopup = () => {
    setSelectedPost(null);
    setShowPostPopup(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      closePostPopup();
    }
  };

  const renderPostContent = (content) => {
    // Replace newline characters with <br> tags
    const formattedContent = content.replace(/\n/g, "<br>");
    return { __html: formattedContent };
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 rounded-lg shadow-md p-4 relative text-gray-300"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p
                className="text-gray-400 mb-2"
                dangerouslySetInnerHTML={renderPostContent(
                  post.content.slice(0, 100) + "..." // Limit content length
                )}
              />
              <p className="text-gray-500 mb-2">Author: {post.author}</p>
              <p className="text-gray-500 mb-2">
                Created At: {new Date(post.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => openPostPopup(post)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="fas fa-eye"></i> Read More
                </button>
                {user && user.uid === post.userId && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => deletePost(post._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPostPopup && selectedPost && (
        <div className="boxout bg-gray-900" onClick={handleOverlayClick}>
          <div className="boxin">
            <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
            <p
              className="text-gray-300 mt-4 mb-4"
              dangerouslySetInnerHTML={renderPostContent(selectedPost.content)}
            />
            <p className="text-gray-500 mb-4">Author: {selectedPost.author}</p>
            <p className="text-gray-500 mb-4">
              Created At: {new Date(selectedPost.createdAt).toLocaleString()}
            </p>
            {user && user.uid === selectedPost.userId && (
              <div className="flex justify-end space-x-2 mb-4">
                <button
                  onClick={() => deletePost(selectedPost._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={closePostPopup}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Prototype />
    </div>
  );
}
