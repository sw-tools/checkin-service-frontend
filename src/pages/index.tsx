import { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  useEffect(() => {
    if (!Router.isReady) return;

    if (Router.pathname === "/") {
      Router.replace("/checkins");
    }
  });

  return null;
};

export default Index;
