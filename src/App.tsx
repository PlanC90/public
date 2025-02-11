import React, { useState, useRef } from 'react';
import { Send, Moon, Stars, Cloud, Sparkles } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    const dreamText = `${inputText}\nrüyam bu şekilde rüyamı yorumla`;
    setMessages(prev => [...prev, { text: dreamText, isUser: true }]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': 'AIzaSyCxfbrmRzqI_4R58d8nemZcZsmk7KsCfAc'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: dreamText
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
        setMessages(prev => [...prev, { text: data.candidates[0].content.parts[0].text, isUser: false }]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', isUser: false }]);
    }

    setIsLoading(false);
    setTimeout(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-screen">
        {/* Header - Fixed at top */}
        <div className="bg-pink-500 p-4 text-white flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Moon className="h-6 w-6" />
            Rüya Yorumlayıcı
          </h1>
          <div className="flex gap-2">
            <Stars className="h-5 w-5 animate-pulse" />
            <Cloud className="h-5 w-5 animate-bounce" />
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-lg shadow-xl">
          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-pink-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="p-4 border-t border-pink-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Rüyanızı anlatın..."
                className="flex-grow p-2 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400"
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                <Send className="h-5 w-5" />
                Rüyamı Yorumla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
