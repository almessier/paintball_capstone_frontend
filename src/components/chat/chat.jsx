import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const chatApiKey = `${process.env.REACT_APP_CHAT_API_KEY}`
const chatSecretApiKey = `${process.env.REACT_APP_CHAT_SECRET_API_KEY}`
const chatClient = StreamChat.getInstance(chatApiKey);
const userToken = 'amessier';

chatClient.connectUser(
  {
    id: 'amessier',
    name: 'amessier',
    image: 'https://getstream.io/random_png/?id=long-mud-6&name=long-mud-6',
  },
  chatClient.devToken(userToken),
);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  name: 'Talk about paintball',
});

const PaintballChat = () => (
  <Chat client={chatClient} theme='messaging light'>
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

export default PaintballChat;




// import React, { useEffect, useState } from 'react';
// import { StreamChat } from 'stream-chat';
// import {
//   Chat,
//   Channel,
//   ChannelHeader,
//   ChannelList,
//   MessageList,
//   MessageInput,
//   Thread,
//   Window,
// } from 'stream-chat-react';
// import 'stream-chat-css/dist/css/index.css';
// import axios from 'axios';

// const filters = { type: 'messaging' };
// const options = { state: true, presence: true, limit: 10 };
// const sort = { last_message_at: -1 };

// const client = StreamChat.getInstance(process.env.REACT_APP_CHAT_API_KEY);

// const PaintballChat = (props) => {
//   const [clientReady, setClientReady] = useState(false);
//   const [user, setUser] = useState(null);

//   const getUser = async () => {
//     try{
//         let response = await axios.get(`http://127.0.0.1:8000/api/auth/get/${props.user.user_id}/`);
//         setUser(response.data);
//     }
//     catch (ex){
//         console.log('Error in getUser API call', ex);
//     }
//     setupClient();
//   }
//   const setupClient = async () => {
//     try {
//       await client.connectUser(
//         {
//           id: `${props.user.user_id}`,
//           name: 'amessier',
//         },
//         client.devToken(`${props.user.user_id}`),
//       );

//       setClientReady(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   if (!clientReady) return null;

//   return (
//     <Chat client={client}>
//       <ChannelList filters={filters} sort={sort} options={options} />
//       <Channel>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// };

// export default PaintballChat;