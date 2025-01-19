import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { chatChatGpt } from "../api/mapApi";

const ChatPage = () => {
  const [messages, setMessages] = useState([]); // 채팅 메시지 리스트
  const [input, setInput] = useState(""); // 사용자 입력
  const [loading, setLoading] = useState(false); // 로딩 상태
  const messagesEndRef = useRef(null); // 스크롤을 제어하기 위한 ref

  // 새 메시지가 추가되면 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput(""); // 입력 필드 초기화
    setLoading(true); // 로딩 시작

    let obj = {
      query: input,
    };

    try {
      const res = await chatChatGpt(obj);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: res.data },
      ]);
    } catch (e) {
      console.error("Error calling the chat API:", e);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "오류가 발생했습니다. 다시 시도해주세요." },
      ]);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <>
      <div className="header-box">
        <div>AI 맞춤 추천 챗봇</div>
      </div>
      <div className="chat-box">
        <div className="message-box">
          {messages.length === 0 && (
            <Typography
              variant="body2"
              sx={{
                color: "#888888",
                textAlign: "center",
                marginTop: "20px",
                fontStyle: "italic",
              }}
            >
              질문을 입력해보세요! (예: "서울에서 가볼 만한 여행지 알려줘")
            </Typography>
          )}
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  padding: "12px 16px",
                  backgroundColor:
                    msg.sender === "user" ? "#e5e0ff" : "#f1f1f1",
                  color: msg.sender === "user" ? "#000" : "#333333",
                  borderRadius: "16px",
                  maxWidth: "70%",
                  wordBreak: "break-word",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                  textAlign: "left",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
              </Typography>
            </Box>
          ))}

          {/* 입력 중 메시지 */}
          {loading && (
            <Box sx={{ textAlign: "center", marginTop: "12px" }}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                입력 중...
              </Typography>
            </Box>
          )}

          {/* 스크롤 이동을 위한 요소 */}
          <div ref={messagesEndRef} />
        </div>

        <Divider sx={{ margin: "8px 0" }} />

        {/* 입력 필드 */}
        <div className="input-field">
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="예: 제주도 맛집 추천"
            variant="outlined"
            size="medium"
            sx={{
              flexGrow: 1,
              marginRight: "8px",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              borderColor: "#e5e0ff",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            sx={{
              padding: "12px 16px",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#145ca8" },
            }}
          >
            보내기
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
