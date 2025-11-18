import { useEffect, useState } from "react"

interface Message {
  id: string
  company: string
  type: string
  position: string
  preview: string
  date: string
  isRead: boolean
  isStarred: boolean
  icon: 'message' | 'email'
}

interface ChatMessage {
  id: string
  sender: 'user' | 'company'
  text: string
  timestamp: string
}

const mockMessages: Message[] = [
  {
    id: '1',
    company: 'TechCorp Inc.',
    type: 'Message',
    position: 'Passenger ship Hotel Staff',
    preview:
      "We'd like to schedule an interview with you for the Passenger ship Hotel Staff position.",
    date: '2025-08-01',
    isRead: false,
    isStarred: false,
    icon: 'message',
  },
  {
    id: '2',
    company: 'WebSolutions',
    type: 'Message',
    position: 'Offshore Construction',
    preview: "Thanks for your application. We'll be in touch soon. ✓",
    date: '2025-07-31',
    isRead: true,
    isStarred: false,
    icon: 'message',
  },
  {
    id: '3',
    company: 'hrgltechcorp.com',
    type: 'Email',
    position: 'Interview Confirmation',
    preview: "We're looking forward to meeting you on July 20th...",
    date: '2023-07-15',
    isRead: false,
    isStarred: false,
    icon: 'email',
  },
  {
    id: '4',
    company: 'hrgltechcorp.com',
    type: 'Email',
    position: 'Interview Confirmation',
    preview: "We're looking forward to meeting you on July 20th...",
    date: '2023-07-15',
    isRead: false,
    isStarred: false,
    icon: 'email',
  },
  {
    id: '5',
    company: 'hrgltechcorp.com',
    type: 'Email',
    position: 'Interview Confirmation',
    preview: "We're looking forward to meeting you on July 20th...",
    date: '2023-07-15',
    isRead: false,
    isStarred: false,
    icon: 'email',
  },
  {
    id: '6',
    company: 'hrgltechcorp.com',
    type: 'Email',
    position: 'Interview Confirmation',
    preview: "We're looking forward to meeting you on July 20th...",
    date: '2023-07-15',
    isRead: false,
    isStarred: false,
    icon: 'email',
  },
  {
    id: '7',
    company: 'xyz.com',
    type: 'Email',
    position: 'Interview Confirmation',
    preview: "We're looking forward to meeting you on July 20th...",
    date: '2023-07-15',
    isRead: false,
    isStarred: false,
    icon: 'email',
  },
  {
    id: '8',
    company: 'abc.com',
    type: 'Email',
    position: 'Interview Confirmation',
    preview: "We're looking forward to meeting you on July 20th...",
    date: '2023-07-15',
    isRead: false,
    isStarred: false,
    icon: 'email',
  },
]

const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'company',
    text: 'Hi John, thank you for your application to the Front Desk Manager position at TechCorp Inc.',
    timestamp: '9:30 am',
  },
  {
    id: '2',
    sender: 'company',
    text: "We've reviewed your resume and would like to schedule an interview with you.",
    timestamp: '9:32 am',
  },
  {
    id: '3',
    sender: 'user',
    text: "Great! I'm very interested in the position. ✓",
    timestamp: '10:15 am',
  },
  {
    id: '4',
    sender: 'company',
    text: 'Are you available Thursday at 2 PM for a video interview?',
    timestamp: '10:20 am',
  },
  {
    id: '5',
    sender: 'company',
    text: 'Are you available Thursday at 2 PM for a video interview?',
    timestamp: '10:20 am',
  },
  {
    id: '6',
    sender: 'company',
    text: 'Are you available Thursday at 2 PM for a video interview?',
    timestamp: '10:20 am',
  },
]

const RecruiterMessages = () => {
   const [messages, setMessages] = useState<Message[]>(mockMessages)
    const [selectedConversation, setSelectedConversation] = useState<string>('1')
    const [searchQuery, setSearchQuery] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [isChatOpenMobile, setIsChatOpenMobile] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 760)
  
    const selectedMsg = messages.find(m => m.id === selectedConversation)
  
    // Track screen resize for mobile toggle
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 760)
        if (window.innerWidth >= 760) setIsChatOpenMobile(false)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])
  
    const markAsRead = (id: string) => {
      setMessages(msgs => msgs.map(msg => (msg.id === id ? { ...msg, isRead: true } : msg)))
    }
  
    const toggleStar = (id: string) => {
      setMessages(msgs =>
        msgs.map(msg => (msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg))
      )
    }
  
    const handleSelectConversation = (id: string) => {
      setSelectedConversation(id)
      markAsRead(id)
      if (isMobile) setIsChatOpenMobile(true)
    }
  
    const handleSendMessage = () => {
      if (newMessage.trim()) {
        // For demo, just clear input (add message sending logic if needed)
        setNewMessage('')
      }
    }
  
    return (
      <div className="flex mx-auto bg-white">
        {/* Conversations Panel */}
        {!isChatOpenMobile && (
          <div className={`w-full ${!isMobile ? 'md:w-80' : 'w-full'} border-r border-gray-150`}>
            {/* Search */}
            <div className="p-4 border-b border-gray-150">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                   <img src={'/svg/search.svg'} alt="icon" />
                </span>
                <input
                  type="text"
                  placeholder="Search conversations"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>
            </div>
  
            {/* Message List */}
            <div className="h-[calc(88vh-4rem)] flex flex-col">
              <div></div>
              <div className="flex-1 overflow-y-auto scrollbar-thin-gray">
                {messages
                  .filter(
                    msg =>
                      msg.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(message => (
                    <button
                      key={message.id}
                      onClick={() => handleSelectConversation(message.id)}
                      className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                        selectedConversation === message.id ? 'bg-red-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 items-center">
                        <div className='bg-gray-150 rounded-lg p-2 text-xsplus'>Co</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 justify-between gap-x-2">
                            <h3
                              className={`text-gray-900 truncate ${
                                !message.isRead ? 'font-bold' : 'font-semibold'
                              }`}
                            >
                              {message.company}
                            </h3>
                            <div className="text-xs text-gray-500 flex-shrink-0">{message.date}</div>
                          </div>
                          <div className="flex justify-between w-full gap-x-2">
                            <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                            {!message.isRead && (
                              <div className="flex items-center justify-center w-[20px] h-[20px] px-1.5 bg-red-600 text-white text-xs font-semibold rounded-full">
                                2
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
  
        {/* Chat Panel */}
        {(isChatOpenMobile || !isMobile) && (
          <div className={`w-full flex-1 flex flex-col ${isMobile ? 'h-[calc(84vh-4rem)]' : 'h-[calc(30vh-rem)]'} max-w-7xl`}>
            {selectedMsg ? (
              <>
                {/* Chat Header */}
                {isMobile && (
                <div className="px-4 py-[13px] border-b border-gray-150 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    
                      <button
                        onClick={() => setIsChatOpenMobile(false)}
                        className="text-gray-500 hover:text-gray-700 p-2"
                      >
                        <img src={'/svg/back-arrow.svg'} alt="icon" />
                      </button>
                    <div>
                      <h2 className="font-semibold text-gray-900">{selectedMsg.company}</h2>
                      <p className="text-sm text-gray-600">{selectedMsg.position}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleStar(selectedMsg.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    {selectedMsg.isStarred ? '⭐' : '☆'}
                  </button>
                </div>
                )}
  
                {/* Messages + Input + Footer Wrapper */}
                <div className="flex flex-col flex-1 h-full">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin-gray">
                    {mockChatMessages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.sender === 'user'
                              ? 'bg-red-600 text-white rounded-br-none'
                              : 'bg-gray-100 text-gray-900 rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                            }`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <img src={'/svg/file.svg'} alt="icon" />
                      </button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                       <img src={'/svg/emoji.svg'} alt="icon" />
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <img src={'/svg/send.svg'} alt="icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
}

export default RecruiterMessages
