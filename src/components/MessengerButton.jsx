import React from 'react';

const MessengerButton = () => {
  return (
    <a
      href="https://m.me/N.T.style"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-16 h-16 bg-[#0084FF] rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      title="მოგვწერეთ Messenger-ში"
    >
      {/* Messenger Icon SVG */}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.03 2 11C2 13.66 3.34 16.03 5.48 17.58L5 22L9.17 19.66C10.07 19.89 11.02 20 12 20C17.52 20 22 15.97 22 11C22 6.03 17.52 2 12 2ZM13 16L10.5 13.5L6 16L11 8L13.5 10.5L18 8L13 16Z" />
      </svg>
    </a>
  );
};

export default MessengerButton;