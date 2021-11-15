import React from 'react';
import './chat.css';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const customClasses = {
  chat: 'custom-chat-class'
};

const PaintballChat = (props) => {
  const chatApiKey = `${process.env.REACT_APP_CHAT_API_KEY}`
  const chatClient = StreamChat.getInstance(chatApiKey);
  let userToken = `${props.loggedInUser.id}`;

  chatClient.connectUser(
    {
      id: `${props.loggedInUser.id}`,
      name: `${props.loggedInUser.username}`,
      image: `http://localhost:8000${props.loggedInUser.avatar}`
    },
    chatClient.devToken(userToken),
  )

  const channel = chatClient.channel('messaging', 'custom_channel_id', {
    // add as many custom fields as you'd like
    name: 'Talk about paintball',
    image: `http://localhost:8000${props.loggedInUser.avatar}`
  });

  return(
    <div className='container'>
      <Chat client={chatClient} customClasses={customClasses} theme='messaging light'>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
};

export default PaintballChat;