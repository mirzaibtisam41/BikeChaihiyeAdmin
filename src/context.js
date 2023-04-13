import React, { createContext, useState ,useEffect} from 'react'

export const GlobalContext = createContext()
 

const context = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState(null)
  const [chat, setChat] = useState([])
  const [activeChatUser, setActiveChatUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [allMessages, setAllMessages] = useState([])
  const[search,setSearch]=useState([])
  const [notifications, setNotifications] = useState(0);
  const [getID, setGetID] = useState();
  const [count, setCount] = useState([]);
  const[ alert, setAlert]=useState([])

  return (
    <GlobalContext.Provider
      value={{
        users,
        setUsers,
        auth,
        setAuth,
        chat,
        setChat,
        allMessages,
        setAllMessages,
        activeChatUser,
        setActiveChatUser,
        loading,
        setLoading,
        notifications,
        setNotifications,
        getID,
        setGetID,
        search,
        setSearch,
        count,
        setCount,
        alert,
        setAlert
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default context
