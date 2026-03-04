import React from 'react'
import { useChatStore } from "../Store/useChatStore.js"
import { useEffect } from 'react'
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceHolder.jsx'
import { useAuthStore } from '../Store/useAuthStore.js'
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton.jsx'
const ChatContainer = () => {
    const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore()
    const { authUser } = useAuthStore()

    useEffect(() => {
        getMessagesByUserId(selectedUser._id)
    }, [selectedUser, getMessagesByUserId])

    return (
        <>
            <ChatHeader />

            <div className='flex-1 px-6 overflow-y-auto  py-8'>
                {messages.length > 0 && !isMessagesLoading ? (
                    <div className='max-w-3xl mx-auto space-y-6'>
                        {messages.map((message) => {
                            return <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end " : "chat-start"}`}>
                                <div className={`chat-bubble relative ${message.senderId === authUser._id ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"}  `}>
                                    {message.image && <img src={message.image} alt={"shared"} className='rounded-lg h-48 object-cover' />}
                                    {message.text && <p className=''>{message.text}</p>}
                                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                                        {new Date(message.createdAt).toLocaleTimeString(undefined, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        })}

                    </div>
                ) : isMessagesLoading ? <MessagesLoadingSkeleton /> : (<NoChatHistoryPlaceholder name={selectedUser.username} />)}
            </div>
            <MessageInput />
        </>
    )
}

export default ChatContainer
