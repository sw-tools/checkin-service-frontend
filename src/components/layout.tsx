import React from "react";
import Navbar from "./navbar";

interface LayoutProps extends React.PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mt-5 mr-5 ml-5" data-theme="emerald-customized">
      <Navbar />
      <div className="mt-5">{children}</div>
    </div>
  );
};

export default Layout;
