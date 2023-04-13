import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import io from "socket.io-client";
import { GlobalContext } from "../../../context";

const InboxFooter = ({ activeChatUser }) => {
  let socket;
  // let url="https://avvocateheroku.herokuapp.com/"
  let url = "https://myavvocatoappadmin.com/";

  const [text, setText] = useState("");
  const {
    auth,
    chat,
    setChat,
    allMessages,
    setAllMessages,
    setNotifications,
    notifications,
    setGetID,
    getID,
  } = useContext(GlobalContext);

  useEffect(() => {
    socket = io(url);
    socket.emit("join", auth?.user?._id);

    socket.on("connect", () => console.log("connected admin", auth?.user?._id));
    socket.on("adminMessage", (msg) => {
      msgReceive(msg);
    });
  }, []);

  useEffect(() => {
    var objDiv = document.getElementById("chatBG");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [allMessages]);

  const msgReceive = (msg) => {
    let newArray = chat;
    newArray.push(msg);
    setChat(newArray);
    getAllMessages();
    setTimeout(() => {
      console.clear();
    }, 3000);
  };

  const getAllMessages = async () => {
    const _messages = await axios.get(`${url}api/messages/all`);
    setNotifications(1);
    if (_messages) {
      setAllMessages(_messages.data);
    }
  };

  const sendMessage = async ({ keyCode }) => {
    if (keyCode === 13) {
      socket = io(url);
      setText("");
      let msgData = {
        sender: auth?.user?._id,
        receiver: activeChatUser && activeChatUser._id,
        message: text,
      };
      socket.emit("adminMessage", msgData);
    }
  };

  return (
    <section
      className="d-flex"
      style={{ height: "100%", backgroundColor: "#f0f0f0" }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100px", flexGrow: "7" }}
      >
        <input
          value={text}
          id="input"
          onKeyDown={(e) => sendMessage(e)}
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
          className="form-control rounded p-2"
          placeholder="Type a message"
        />
      </div>
    </section>
  );
};

export default InboxFooter;
