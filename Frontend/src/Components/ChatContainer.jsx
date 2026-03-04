import React from 'react'
import { useChatStore } from "../Store/useChatStore.js"
import { useEffect } from 'react'
const ChatContainer = () => {
    const { selectedUser, getMessagesByUserId, messages } = useChatStore()

    useEffect(() => {
        getMessagesByUserId(selectedUser._id)
    }, [selectedUser, getMessagesByUserId])

    return (
        <>
<ChatHeader/>
        </> 
    )
}

export default ChatContainer
