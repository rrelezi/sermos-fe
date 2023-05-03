import React from "react";
import { ChatItem } from "react-chat-elements";
import {useNavigate} from "react-router-dom";

const ChatList = () => {

    const navigate = useNavigate();

    const onChatSelect = (id: string) => navigate(`/main/home/chat?id=${id}`);


  return (
    <div className={"flex-1 bg-white mt-2 rounded p-2"}>
      <ChatItem
        avatar="https://avatars.githubusercontent.com/u/41473129?v=4"
        alt="avatar"
        title="G-ja"
        subtitle="What are you doing ?"
        date={new Date()}
        muted
        showMute
        showVideoCall
        unread={2}
        id={"1"}
        onClick={()=> onChatSelect('id')}
      />
    </div>
  );
};

export default ChatList;
