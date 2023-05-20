import React, {useState} from "react";
import { ChatItem } from "react-chat-elements";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatService from "../../services/ChatService";

const ChatList = () => {
  const { convos } = useSelector((state: any) => state.profile);

  const navigate = useNavigate();

  const onChatSelect = (friend: any) => {
    ChatService.markAllSeen(friend.id);

    navigate(`/main/home/chat`, {
      state: {
        friendId: friend.id,
        friendName: friend.name
      },
    });
  };

  const [unseenCounts,setUnseen] = useState(convos.map(({ unseenCount } : any) => unseenCount))


  if (!!convos && convos.length > 0)
    return (
      <div className={"flex-1 bg-white mt-2 rounded p-2"}>
        {convos.map(({ friend, lastMessage, unseenCount }: any, indx: number) => (
          <ChatItem
              key={indx}
            avatar={friend.avatar}
            alt="friend"
            title={friend.name}
            subtitle={lastMessage.message_content}
            date={new Date(lastMessage.sent_on)}
            statusText={lastMessage.status}
            unread={!lastMessage.isMine ? unseenCounts[indx] : 0}
            id={friend.id}
            onClick={() => {
                onChatSelect(friend)
                const newUnseen = unseenCounts;
                newUnseen[indx] = 0;
                setUnseen(newUnseen)
            }}
          />
        ))}
      </div>
    );

  return (
    <div>
      You don't have any friends. Add new friends to start a conversation.
    </div>
  );
};

export default ChatList;
