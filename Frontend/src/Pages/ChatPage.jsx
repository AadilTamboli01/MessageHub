import React from 'react'
import { useChatStore } from '../Store/useChatStore.js'
import ProfileHeader from "../Components/ProfileHeader.jsx"
import ActiveTabSwitch from '../Components/ActiveTabSwitch.jsx'
import ChatList from '../Components/ChatList.jsx'
import ContactList from '../Components/ContactList.jsx'
import ChatContainer from '../Components/ChatContainer.jsx'
import NoConversationPlaceHolder from '../Components/NoConversationPlaceHolder.jsx'

const ChatPage = () => {

  const { activeTab, selectedUser } = useChatStore()
  return (
    <div className='relative w-full max-w-6xl h-[800px]'>

      {/*  left side */}
      <div className='width -80 bg-slate-800/50 backdrop-blur-sm flex  flex-col'>
        <ProfileHeader />
        <ActiveTabSwitch />

        <div className='flex-1 overflow-y-auto p-4  space-y-2'>
          {activeTab == "chat" ? <ChatList /> : <ContactList />}
        </div>
      </div>

      {/* right Side  */}

      <div className='flex flex-1 flex-col bg-slate-900/50 backdrop-blur-sm'>
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceHolder />}
      </div>

    </div>
  )
}

export default ChatPage
