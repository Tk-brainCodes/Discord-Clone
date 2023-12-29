import React from "react";

type LayoutProp = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: LayoutProp) => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      {children}
    </div>
  );
};

export default AuthLayout;
