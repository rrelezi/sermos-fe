import React, { useRef } from "react";
import { getQueryParams } from "../../services/UtilityService";
import { useLocation, useNavigate } from "react-router-dom";
import {Input, MessageList} from "react-chat-elements";
import AppIcon from "../AppIcon";
import AppButton from "../AppButton";

const ChatScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = getQueryParams(decodeURI(location.pathname));

  return (
    <div className={"flex flex-col justify-between rounded bg-gray-400 p-5 w-full h-full"}>
      <AppIcon
        icon={"ri-arrow-left-circle-line"}
        scale={2}
        className={"cursor-pointer w-8 mx-5 mb-5 invert"}
        onClick={() => navigate('/main/home')}
      />
<div>
    <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[
            {
                position: "left",
                id: "1",
                focus: false,
                date: new Date(),
                titleColor: "",
                removeButton: false,
                replyButton: true,
                forwarded: true,
                retracted: false,
                notch: false,
                type: "text",
                title: "user2",
                text: "Give me a message list example !",
            },
            {
                id: "2",
                focus: false,
                date: new Date(),
                titleColor: "",
                removeButton: false,
                replyButton: true,
                forwarded: true,
                status: "received",
                retracted: false,
                notch: false,
                position: "right",
                type: "text",
                title: "user1",
                text: "That's all.",
            },
        ]}
    />

    <Input
        className={'border-2 rounded-md border-black mt-2'}
        placeholder="Type here..."
        multiline={true}
        rightButtons={<AppIcon icon={'ri-send-plane-2-fill'} className={'px-2 font-medium cursor-pointer w-18'} scale={1.2} />}
    />
</div>

    </div>
  );
};

export default ChatScreen;
