import { useState } from "react";
import { mockChats } from "@/data/mockData";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const WhatsAppClone = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>(undefined);
  const [showChatList, setShowChatList] = useState(true);

  const selectedChat = selectedChatId 
    ? mockChats.find(chat => chat.id === selectedChatId)
    : undefined;

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    setShowChatList(false); // Hide chat list on mobile when chat is selected
  };

  const handleBackToList = () => {
    setShowChatList(true);
    setSelectedChatId(undefined);
  };

  return (
    <div className="flex h-screen bg-whatsapp-bg">
      {/* Chat List - Hidden on mobile when chat is selected */}
      <div className={`w-full lg:w-1/3 lg:border-r lg:border-whatsapp-border ${
        showChatList ? 'block' : 'hidden lg:block'
      }`}>
        <ChatList
          chats={mockChats}
          selectedChatId={selectedChatId}
          onChatSelect={handleChatSelect}
        />
      </div>

      {/* Chat Window - Hidden on mobile when no chat is selected */}
      <div className={`flex-1 ${
        !showChatList ? 'block' : 'hidden lg:block'
      }`}>
        {selectedChat ? (
          <ChatWindow 
            chat={selectedChat} 
            onBack={handleBackToList}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-whatsapp-chat-bg">
            <div className="text-center text-muted-foreground">
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full"></div>
                </div>
              </div>
              <h2 className="text-xl font-medium mb-2">WhatsApp Clone</h2>
              <p className="text-sm">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppClone;