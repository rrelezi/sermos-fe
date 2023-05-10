import React, { useEffect, useRef, useState } from "react";
import { emailRegex, getQueryParams } from "../../services/UtilityService";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, MessageList } from "react-chat-elements";
import AppIcon from "../AppIcon";
import AppButton from "../AppButton";
import { useForm } from "react-hook-form";
import AppInput from "../AppInput";
import { useSelector } from "react-redux";
import ChatService, { pusher } from "../../services/ChatService";
import UserService from "../../services/UserService";

const ChatScreen = () => {
  const location = useLocation();
  const friendId = location.state.id;
  const navigate = useNavigate();

  const [messageList, setMessageList] = useState(null);

  const messageListRef = useRef(null);

  const { id, name } = useSelector((state) => state.profile);

  const channel = pusher.subscribe(`sermo.${id}`);


  useEffect(() => {
    UserService.getMessages({
      id,
      friendId,
      page: 1,
      pageSize: 15,
    }).then(({ data }) => {
      setMessageList(data);
    });
  }, []);

  useEffect(() => {
    messageListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messageListRef, messageList]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendMessage = (e) => {
    reset();
    ChatService.sendMessage({
      id: id,
      friendId: friendId,
      text: e.message,
    });

    const messages = messageList;
    const newMessage = {
      id: id,
      isMine: 1,
      message_content: e.message,
      sent_on: new Date(),
      status: "sent",
    };

    messages.push(newMessage);
    setMessageList(messages);
  };

  useEffect(()=>{
    channel.bind("addMessage", (data) => {
      console.log(data);
    });
  },[sendMessage])

  //const test = useSelector(state => state.profile );

  const getChatData = (messages) => {
    if (!!messages)
      return messages.map((el) => ({
        position: el.isMine ? "right" : "left",
        id: el.id,
        focus: false,
        date: el.sent_on,
        removeButton: false,
        replyButton: true,
        notch: true,
        type: "text",
        title: el.isMine ? name : "friend",
        text: el.message_content,
        status: el.isMine ? el.status : "",
      }));
  };

  if (!messageList) return <div>loading</div>;

  return (
    <div
      className={
        "flex flex-col justify-between rounded bg-gray-400 p-5 w-full h-full"
      }
    >
      <AppIcon
        icon={"ri-arrow-left-circle-line"}
        scale={2}
        className={"cursor-pointer w-8 mx-5 mb-5 invert"}
        onClick={() => navigate("/main/home")}
      />
      <div>
        <MessageList
          className="message-list chat-screen"
          toBottomHeight={"100%"}
          dataSource={getChatData(messageList)}
          referance={messageListRef}
        />

        <form onSubmit={handleSubmit(sendMessage)}>
          <div className={"flex flex-row"}>
            <AppInput
              {...register("message")}
              className={"rounded-b-md font-mono"}
              containerClassName={"w-full mb-0 mt-3 mr-2"}
              labelIcon={"ri-user-line"}
              errors={errors}
              maxLength={256}
              placeholder={"Type here..."}
            />
            <AppButton
              type="submit"
              className={"w-3/12 mt-3 h-10 bg-gray-300 rounded-b-md"}
              text={"Send -->"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
