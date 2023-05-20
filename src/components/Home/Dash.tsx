import React from "react";
import AppLayout from "../AppLayout";
import DashPanel from "./DashPanel";
import { Outlet } from "react-router-dom";

const Dash = () => {
  return (
    <AppLayout>
      <div className={"flex-1 flex flex-row overflow-x-auto"}>
        <DashPanel />
        <Outlet />
      </div>
    </AppLayout>
  );
};

export default Dash;
