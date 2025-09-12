import { Message } from "@/data/mockData";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex mb-3 ${message.sent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
          message.sent
            ? 'bg-whatsapp-message-sent text-whatsapp-message-sent-text ml-8'
            : 'bg-whatsapp-message-received text-whatsapp-message-received-text mr-8'
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>
        <p className={`text-xs mt-1 ${
          message.sent ? 'text-whatsapp-message-sent-text/70' : 'text-muted-foreground'
        }`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;