/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qpcgYVyR4tg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */


import { useState, useRef, useEffect } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "/placeholder-user.jpg",
      },
      content:
        "Hey, how is it going? This is a very long message that should wrap to the next line if it takes up more than 30% of the screen width.",
      timestamp: "2023-07-05T12:34:56Z",
      isSender: false,
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "/placeholder-user.jpg",
      },
      content:
        "Great, thanks for asking! This is another long message that should wrap to the next line if it takes up more than 30% of the screen width.",
      timestamp: "2023-07-05T12:35:01Z",
      isSender: false,
    },
    {
      id: 3,
      user: {
        name: "Bob Johnson",
        avatar: "/placeholder-user.jpg",
      },
      content: "Doing well, how about you? This is a shorter message that should not wrap.",
      timestamp: "2023-07-05T12:35:10Z",
      isSender: false,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)
  const [onlineParticipants, setOnlineParticipants] = useState([
    { name: "John Doe", avatar: "/placeholder-user.jpg" },
    { name: "Jane Smith", avatar: "/placeholder-user.jpg" },
    { name: "Bob Johnson", avatar: "/placeholder-user.jpg" },
  ])
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: messages.length + 1,
        user: {
          name: "You",
          avatar: "/placeholder-user.jpg",
        },
        content: newMessage,
        timestamp: new Date().toISOString(),
        isSender: true,
      }
      setMessages([...messages, newMessageObj])
      setNewMessage("")
      scrollToBottom()
    }
  }
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  return (
    <div className="flex flex-col h-screen max-h-full min-w-56">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Chatter Cave</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">{onlineParticipants.length}</span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuLabel>Online Participants</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {onlineParticipants.map((participant, index) => (
                <DropdownMenuItem key={index}>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>{participant.name}</div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button variant="ghost" size="icon">
            <MoveHorizontalIcon className="w-5 h-5" />
          </Button> */}
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4 bg-background">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${message.isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`bg-secondary text-secondary-foreground rounded-lg p-3 flex flex-col gap-2 ${
                  message.content.length > 80 ? "max-w-[70%] whitespace-pre-wrap" : "max-w-[60%]"
                }`}
              >
                <div className="font-medium text-left">{message.user.name}</div>
                <div className="text-sm text-left">{message.content}</div>
                <div className="text-right text-xs text-muted-foreground ">
                  {new Date(message.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, year: 'numeric', month: 'short', day: 'numeric' })}
                  <Separator orientation="vertical" className="h-4" />
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-background border-t py-4 px-6">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            className="pr-16 rounded-lg"
          />
          <Button type="button" onClick={handleSendMessage} className="absolute top-1/2 right-4 -translate-y-1/2">
            <SendIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}