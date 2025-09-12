import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Chat } from "@/data/mockData";

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string;
  onChatSelect: (chatId: string) => void;
}

const ChatList = ({ chats, selectedChatId, onChatSelect }: ChatListProps) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-whatsapp-sidebar">
      {/* Header */}
      <div className="p-4 border-b border-whatsapp-border bg-whatsapp-sidebar">
        <h1 className="text-xl font-semibold text-foreground">Chats</h1>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`flex items-center p-4 border-b border-whatsapp-border cursor-pointer hover:bg-muted/50 transition-colors ${
              selectedChatId === chat.id ? 'bg-muted/70' : ''
            }`}
          >
            <Avatar className="h-12 w-12 mr-3">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {chat.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-foreground truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                  {formatTime(chat.lastMessageTime)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate flex-1">
                  {chat.lastMessage}
                </p>
                {chat.unreadCount && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 ml-2 flex-shrink-0">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;