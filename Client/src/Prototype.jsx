import React, { useState } from "react";

export default function Prototype() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const toggleAlert = () => {
    setIsAlertVisible(!isAlertVisible);
    setIsButtonClicked(true);
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      {!isButtonClicked && (
        <button
          className="fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-full focus:outline-none"
          onClick={toggleAlert}
        >
          !
        </button>
      )}
      {isAlertVisible && (
        <div
          id="alert-additional-content-3"
          className="fixed bottom-5 right-4 p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 w-80"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Prototype Alert</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            Please note that this project is a prototype designed for personal
            use and demonstration purposes only. It is not intended for
            real-world application.
          </div>
          <div className="flex">
            <a
              href="https://yogeshwar.pro"
              className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <svg
                className="mr-2 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              About this project
            </a>
            <button
              type="button"
              className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
              onClick={closeAlert}
              aria-label="Close"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
}
