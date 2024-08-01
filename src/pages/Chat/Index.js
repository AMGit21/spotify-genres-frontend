import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavbarChat from "../../components/NavbarChat";
import { v4 as uuidv4 } from "uuid";
import styles from "./chat.module.css";
import { IoIosSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import usePost from "../../hooks/usePost";
import cacheData from "../../utils/cacheData";
import getCachedData from "../../utils/getCachedData";
import useFetch from "../../hooks/useFetch";

const Chat = () => {
  const location = useLocation();
  const { genreId, artistId, picture, name, totalFollowers, popularityNumber } =
    location.state || {};

  const initialDummyChat = [
    {
      role: "ai",
      text: `Hello! How can I help you with information about ${name}?`,
    },
    { role: "user", text: "Can you tell me more about their latest album?" },
    {
      role: "ai",
      text: `${name}'s latest album has been a major hit, featuring tracks like "Song A" and "Song B". It has been critically acclaimed for its innovative sound and lyrical depth.`,
    },
  ];

  const cacheKey = `chatHistory_${name}`;
  let storedChatHistory = getCachedData(cacheKey);

  storedChatHistory =
    typeof storedChatHistory === "string" ? storedChatHistory : null;

  const [chatHistory, setChatHistory] = useState(() => {
    try {
      return storedChatHistory
        ? JSON.parse(storedChatHistory)
        : initialDummyChat;
    } catch (error) {
      console.error("Error parsing cached chat history:", error);
      return initialDummyChat;
    }
  });

  const [userInput, setUserInput] = useState("");
  const [userId, setUserId] = useState(
    () => getCachedData("userId") || uuidv4()
  );
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const { data, loadingPost, errorPost, sendRequest } = usePost(
    "http://localhost:4000/api/gemini"
  );

  const { fetchedData, loadingFetch, errorFetch } = useFetch(
    `http://localhost:4000/api/chat-history/${userId}/${artistId}`,
    cacheKey
  );

  useEffect(() => {
    // Caching chat history
    try {
      cacheData(cacheKey, JSON.stringify(chatHistory));
    } catch (error) {
      console.error("Error caching chat history:", error);
    }

    // Fetching chat history and setting initial data
    if (fetchedData) {
      setChatHistory(fetchedData || []);
    } else if (errorFetch) {
      console.error("Error fetching chat history:", errorFetch);
    }

    // Caching userId
    cacheData("userId", userId);

    // Scroll to bottom of chat on update
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, fetchedData, errorFetch, userId]);

  useEffect(() => {
    if (data) {
      setChatHistory((prevHistory) => {
        const updatedHistory = [
          ...prevHistory,
          { role: "ai", text: data.response },
        ];
        cacheData(cacheKey, JSON.stringify(updatedHistory));
        return updatedHistory;
      });
    }
  }, [data, cacheKey]);

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", text: userInput };
    setChatHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, newMessage];
      cacheData(cacheKey, JSON.stringify(updatedHistory));
      return updatedHistory;
    });
    setUserInput(""); // Clear input after sending

    const formattedHistory = chatHistory.map((message) => ({
      role: message.role,
      text: message.text,
    }));

    sendRequest({
      history: formattedHistory,
      userInput: userInput.trim(),
      userId,
      artistId,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
  };

  return (
    <div>
      <NavbarChat
        genreId={genreId}
        picture={picture}
        name={name}
        totalFollowers={totalFollowers}
        popularityNumber={popularityNumber}
      />
      {chatHistory && chatHistory.length > 0 && (
        <div className={styles.chatContainer}>
          <div className={styles.chatHistory}>
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? styles.userMessage
                    : styles.aiMessage
                }
              >
                {message.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <div className={styles.chatInputContainer}>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask something about the artist..."
              className={styles.chatInput}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className={styles.attachFileButton}
            >
              <MdAttachFile className={styles.attachFileIcon} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div className={styles.sendButtonSection}>
              <button onClick={sendMessage} className={styles.sendButton}>
                Send <IoIosSend className={styles.sendIcon} />
              </button>
              <div className={styles.characterCount}>
                {userInput.length} / 2000
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
