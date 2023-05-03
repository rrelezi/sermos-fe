import React, { useRef } from "react";
import {emailRegex, getQueryParams} from "../../services/UtilityService";
import { useLocation, useNavigate } from "react-router-dom";
import {Input, MessageList} from "react-chat-elements";
import AppIcon from "../AppIcon";
import AppButton from "../AppButton";
import {useForm} from "react-hook-form";
import AppInput from "../AppInput";
import {useSelector} from "react-redux";
import ChatService, { pusher } from '../../services/ChatService';

const ChatScreen = () => {
    const { id } = useSelector(state => state.profile);
    const channel = pusher.subscribe(`sermo.${id}`);
    channel.bind('addMessage', (data) => {
        console.log(data)
    } )

    console.log(id);

    //console.log(channel);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const sendMessage = (e) => {
      console.log(e.message)
      ChatService.sendMessage({
          id:id,
          friendId: id === 1? 2 : 1,
          text: e.message
      })
      console.log(e);
  }

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
                notch: true,
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

    <form onSubmit={handleSubmit(sendMessage)}>
        <div className={'flex flex-row'}>
            <AppInput
                {...register('message')}
                className={"rounded-b-md font-mono"}
                containerClassName={'w-full mb-0 mt-3 mr-2'}
                labelIcon={"ri-user-line"}
                errors={errors}
                maxLength={256}
                placeholder={'Type here...'}
            />
            <AppButton type='submit' className={'w-3/12 mt-3 h-10 bg-gray-300 rounded-b-md'} text={'Send -->'} />
        </div>

    </form>

</div>

    </div>
  );
};

export default ChatScreen;
