import React from 'react';
import html2pdf from 'html2pdf.js';
import ResponseBubble from './responseBubble';
import MessageBubble from './messageBubble';

const ShowConversationComponent = ({ selectedConversation }) => {
  const handleDownload = () => {
    const element = document.getElementById('conversation-div');

    const opt = {
      margin: 0.5,
      filename: 'conversation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div id="conversation-div" className="p-4">
      {selectedConversation.content.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start flex-col'
            } mb-4`}
        >
          {message.sender === 'user' ? (
            <MessageBubble inputMessage={message.message} />
          ) : (
            (() => {
              let parsedData;
              try {
                if (message.Title === 'Question' || message.Title === '') {
                  message.Title = 'NoTitle';
                  message.Question = message.Info;
                }
                parsedData = message;
              } catch (e) {
                parsedData = { Title: 'Error', Info: 'Invalid response format.' };
              }

              return (
                <ResponseBubble
                  Title={parsedData.Title}
                  response={parsedData.Info}
                  Question={parsedData.Question}
                />
              );
            })()
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowConversationComponent;
