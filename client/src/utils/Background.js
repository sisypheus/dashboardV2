import React from "react";

const Background = ({children}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark transition-all">
      {children}
    </div>
  );
};

export default Background;