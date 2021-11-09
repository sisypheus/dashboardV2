import React from "react";

const Background = ({children}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark transition-all dark:opacity-90">
      {children}
    </div>
  );
};

export default Background;