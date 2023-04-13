import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import Chat from "./Chat/Chat";
import { GlobalContext } from "./context";
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {

  const { auth, setAuth, chat, setChat, allMessages, setAllMessages, setNotifications, setGetID, count, setCount, getID } = useContext(GlobalContext)


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch('https://www.myavvocatoappadmin.com/api/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      })
        .then(res => res.json())
        .then(data => {
          setAuth(data);
        })
    }
  }, [])
  let socket

  let url = 'https://myavvocatoappadmin.com/'

  useEffect(() => {
    socket = io(url)
    socket.emit('join', auth?.user?._id)

    socket.on('connect', () => console.log('connected admin', auth?.user?._id))
    socket.on('adminMessage', (msg) => {

      msgReceive(msg)

      //savedID(msg.sender)
      setGetID(msg.sender)
      if (msg.sender !== auth?.user?._id) {
        setCount((prevUsers) => [...prevUsers, msg.sender])
      }
    })
  }, []);


  // const savedID=(id)=>{
  //   var dataID=[]
  //   dataID.push(id)
  //   localStorage.setItem("dataID", JSON.stringify(dataID))
  // }

  localStorage.setItem("count", JSON.stringify(count))
  const msgReceive = (msg) => {
    let newArray = chat
    newArray.push(msg)
    setChat(newArray);
    getAllMessages();


    setTimeout(() => {
      console.clear();
    }, 3000);


  }

  const getAllMessages = async () => {
    const _messages = await axios.get(`${url}api/messages/all`)

    if (_messages) {
      setAllMessages(_messages.data)
      setNotifications(1)
    }
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
          <Route exact path="/chat" component={Chat} />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
          <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}
export default App;