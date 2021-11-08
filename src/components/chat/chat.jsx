import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';


const chatClient = StreamChat.getInstance('4szznm8xu2ar');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibG9uZy1tdWQtNiJ9.UOc65ZamD66nWK-yiljmtbYydV-XiK8t3BA1PlufJD0';

chatClient.connectUser(
  {
    id: 'long-mud-6',
    name: 'long-mud-6',
    image: 'https://getstream.io/random_png/?id=long-mud-6&name=long-mud-6',
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'Talk about paintball',
  members: ['long-mud-6'],
});

const App = () => (
  <Chat client={chatClient} theme='messaging dark'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;