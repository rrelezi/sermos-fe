import React from "react";
import ChatList from "../Chat/ChatList";
import ProfileTab from "../Profile/ProfileTab";

const DashPanel = () => (
  <div className={"dash-panel"}>
    <ProfileTab />
    <ChatList />
  </div>
);

export default DashPanel;
