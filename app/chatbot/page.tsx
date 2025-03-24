"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { Send, Bot, User, Check, CheckCheck, Image, Paperclip } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { nhost } from "@/lib/nhost";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  mediaUrl?: string;
  mediaType?: "image" | "file";
}

export default function ChatbotPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    requireAuth(() => {
      // Load messages from Nhost
      loadMessages();
    });
  }, [isAuthenticated]);

  const loadMessages = async () => {
    try {
      const { data, error } = await nhost.graphql.request(`
        query GetMessages {
          messages(order_by: { timestamp: asc }) {
            id
            text
            sender
            timestamp
            status
            mediaUrl
            mediaType
          }
        }
      `);

      if (error) throw error;
      setMessages(data.messages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Upload to Nhost Storage
      try {
        const { error: uploadError } = await nhost.storage.upload({
          file,
          bucketId: "chat-media",
        });
        if (uploadError) throw uploadError;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    if (selectedFile) {
      newMessage.mediaType = selectedFile.type.startsWith("image/") ? "image" : "file";
      // Add mediaUrl from Nhost storage
    }

    try {
      // Save message to Nhost
      const { data, error } = await nhost.graphql.request(`
        mutation InsertMessage($message: messages_insert_input!) {
          insert_messages_one(object: $message) {
            id
          }
        }
      `, {
        message: newMessage
      });

      if (error) throw error;

      setMessages(prev => [...prev, newMessage]);
      setInput("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <Bot className="h-6 w-6" />
            </Avatar>
            <div>
              <CardTitle>EduPass+ Assistant</CardTitle>
              {isTyping && (
                <p className="text-sm text-muted-foreground">En train d'écrire...</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="mt-1">
                      {message.sender === "bot" ? (
                        <Bot className="h-6 w-6" />
                      ) : (
                        <User className="h-6 w-6" />
                      )}
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.mediaUrl && message.mediaType === "image" && (
                          <img
                            src={message.mediaUrl}
                            alt="Image"
                            className="max-w-full rounded-lg mb-2"
                          />
                        )}
                        {message.mediaUrl && message.mediaType === "file" && (
                          <a
                            href={message.mediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 mb-2 text-sm underline"
                          >
                            <Paperclip className="h-4 w-4" />
                            <span>Fichier joint</span>
                          </a>
                        )}
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(message.timestamp), "HH:mm", { locale: fr })}
                        </span>
                        {message.sender === "user" && (
                          <div className="text-xs text-muted-foreground">
                            {message.status === "sent" && <Check className="h-3 w-3" />}
                            {message.status === "delivered" && <CheckCheck className="h-3 w-3" />}
                            {message.status === "read" && (
                              <CheckCheck className="h-3 w-3 text-blue-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <form onSubmit={handleSend} className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Fichier sélectionné: {selectedFile.name}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}