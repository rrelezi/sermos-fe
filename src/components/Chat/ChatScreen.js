import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, MessageBox, MessageList } from "react-chat-elements";
import AppIcon from "../AppIcon";
import AppButton from "../AppButton";
import { useForm } from "react-hook-form";
import AppInput from "../AppInput";
import { useSelector } from "react-redux";
import ChatService, { pusher } from "../../services/ChatService";
import UserService from "../../services/UserService";
import Pusher from "pusher-js";

const ChatScreen = () => {
  const { id, name } = useSelector((state) => state.profile);

  const location = useLocation();
  const { friendId, friendName } = location.state;
  const navigate = useNavigate();

  const channel = pusher.subscribe(`sermo.${id}`);

  useEffect(() => {
    channel.bind(
      "addMessage",
      ({ message }) => {
        const messages = messageList;
        messages.push({
          title: friendName,
          date: message.sent_on,
          id: message.id,
          text: message.message_content,
          isMine: 0,
          type: "text",
          position: "left",
        });
        setMessageList(messages);
      },
      { name: Pusher }
    );
  }, []);

  const [messageList, setMessageList] = useState([]);
  const [screenTop, setScreenTop] = useState(null);
  const [pageSize, setPageSize] = useState(0);

  const messageListRef = useRef(null);
  const messageEndRef = useRef(null);

  const addMessages = (amount = 0, scrollTo = -1) => {
    UserService.getMessages({
      id,
      friendId,
      page: 1,
      pageSize: 20 + amount,
    }).then(({ data }) => {
      if (data.length > 0) setMessageList(getChatData(data).reverse());
    })
  };

  useEffect(() => {
    addMessages(0);
  }, []);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }, [messageList])

  const onScroll = () => {
    if (messageListRef.current) {
      const { scrollTop } = messageListRef.current;
      if (scrollTop === 0) {
        setScreenTop(true);
      }
    }
  };

  useEffect(() => {
    const scrollIndex = messageListRef?.current?.children[0]?.offsetHeight;
    if (screenTop) {
      setPageSize(pageSize + 20);
      addMessages(pageSize+20, scrollIndex);
      setScreenTop(false);
    }
  }, [screenTop]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendMessage = (e) => {
    reset();
    const messages = messageList;
    messages.push({
      title: name,
      date: new Date(),
      text: e.message,
      isMine: 1,
      type: "text",
      position: "right",
    });
    setMessageList([...messages]);
    ChatService.sendMessage({
      id: id,
      friendId: friendId,
      text: e.message,
    })
  };

  const getChatData = (messages) => {
    if (!!messages && messages.length > 0)
      return messages.map((el) => ({
        position: el.isMine ? "right" : "left",
        id: el.id,
        focus: false,
        date: el.sent_on,
        removeButton: false,
        replyButton: true,
        notch: true,
        type: "text",
        title: el.isMine ? name : friendName,
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
        <div
          className={"overflow-auto"}
          style={{
            height: "70vh",
            maxHeight: "70vh",
          }}
          ref={messageListRef}
          onScroll={onScroll}
        >
          {messageList.map((message, index) => (
            <MessageBox
              key={index}
              position={message.position}
              title={message.title}
              type={message.type}
              text={message.text}
              date={message.date}
              id={message.id}
            />
          ))}

          <div ref={messageEndRef} className={'h-2'} />
        </div>

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
