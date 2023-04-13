import React, { useEffect, useState, useContext } from "react";
import "./Left.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import moment from "moment";

const Recipient = () => {
  const [cols, setCols] = useState("black");
  const {
    setAlert,
    users,
    setUsers,
    getID,
    auth,
    chat,
    search,
    setActiveChatUser,
    setLoading,
    allMessages,
    setAllMessages,
    setNotifications,
    notifications,
  } = useContext(GlobalContext);
  let url = "https://myavvocatoappadmin.com/";

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    setLoading(true);
    fetch(`https://www.myavvocatoappadmin.com/api/getUsers`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.message) {
          setLoading(false);
          setUsers(data);
        }
      });
  };

  const startChat = async (item) => {
    setActiveChatUser(item);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    const _messages = await axios.get(`${url}api/messages/all`);

    if (_messages) {
      setAllMessages(_messages.data);
    }
  };

  const getRecentMessage = (user) => {
    var _Recent =
      allMessages &&
      allMessages?.filter((item) => {
        if (item.sender === user._id || item.receiver === user._id) {
          return item;
        }
      });

    if (_Recent[_Recent.length - 1] !== undefined) {
      let _date = moment(_Recent[_Recent.length - 1]?.createdAt)
        .startOf("hour")
        .fromNow();
      let obj = {
        message: _Recent[_Recent.length - 1]?.message,
        date: _date,
        senderID: _Recent[_Recent.length - 1].sender,
      };

      return obj;
    }
  };

  return (
    <div>
      {users &&
        users
          ?.filter((post) => {
            if (search === "") {
              return post;
            } else if (
              post.name
                ?.toString()
                .toLowerCase()
                .includes(search?.toString().toLowerCase())
            ) {
              return post;
            }
          })
          .map((item, key) => {
            if (item._id !== auth?.user?._id) {
              return (
                <div
                  onClick={(e) => {
                    startChat(item),
                      getID === item._id ? setNotifications(0) : "";
                  }}
                  style={{
                    color:
                      getID === item._id && notifications > 0 ? "#87CEEB" : "",
                  }}
                  id="friendDiv"
                  className="d-flex justify-content-between align-items-center p-2 "
                >
                  <div
                    className="rad rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  >
                    <img
                      className="rounded-circle"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src="https://thumbs.dreamstime.com/b/worker-man-flat-icon-banker-blue-icons-trendy-style-account-manager-gradient-design-designed-web-app-eps-142383568.jpg"
                      alt="ProfilePic"
                    />
                  </div>

                  {getRecentMessage(item)?.senderID !== auth?.user?._id &&
                  getRecentMessage(item)?.senderID !== undefined ? (
                    <>
                      <div
                        className="d-flex flex-column"
                        style={{ color: "#87CEEB" }}
                      >
                        <h6>
                          {item.name.length > 15
                            ? item?.name?.substring(0, 14) + "..."
                            : item.name}
                        </h6>
                        <span>
                          {getRecentMessage(item)?.message.substring(0, 25)}
                        </span>
                      </div>

                      <div
                        className="d-flex align-items-center"
                        style={{ color: "#87CEEB" }}
                      >
                        {getRecentMessage(item)?.date}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex flex-column">
                        <h6>
                          {item.name.length > 15
                            ? item?.name?.substring(0, 14) + "..."
                            : item.name}
                        </h6>
                        <span>
                          {getRecentMessage(item)?.message.substring(0, 25)}
                        </span>
                      </div>

                      <div className="d-flex align-items-center">
                        {getRecentMessage(item)?.date}
                      </div>
                    </>
                  )}
                </div>
              );
            }
          })}
    </div>
  );
};

export default Recipient;
