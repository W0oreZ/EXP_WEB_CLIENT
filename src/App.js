import React from 'react';
import socketIOClient from "socket.io-client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import ChatBubble from 'react-chat-bubble';

import TopMenu from './layout/TopMenu';

//Pages
import Dashboard from './Pages/Dashboard.jsx';
import MyTrackers from './Pages/MyTrackers.jsx';
import ResMonitor from './Pages/ResMonitor.jsx';
import TrackerView from './Pages/TrackerView.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import MapView from './Pages/MapView.jsx';
import Yassine from './Pages/Yassine.jsx';

import "./App.css";
import { Container } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props){
    const id = parseInt(Math.random()*100);
    super(props)
    this.state = {
      chatId:id,
      socket:socketIOClient("41.140.242.182:7700"),
      messages:[{
          "type": 1,
          "image": "dog.jpg",
          "text": "Welcome to the chat room"
      }]
    }
  }

  handleoutput(message)
  {
    console.log("getting" ,message)
    const newmessage = {
      chatId:this.state.chatId,
      type:0,
      image:"cat.jpg",
      text:message
    }

    //this.setState({messages:[...this.state.messages,newmessage]});
    this.state.socket.emit("EXP_WEB_SERVER/ChatAPP", newmessage);
  }

  componentDidMount(){
    const { socket , chatId} = this.state;

    socket.on("EXP_WEB_SERVER/ChatAPP", data =>{
      console.log(data);
      //const newmessage = data;
      if(data.chatId === chatId)
      {
        data.type = 0;
        this.setState({messages:[...this.state.messages,data]});
      }
      else
      {
        data.type = 1;
        this.setState({messages:[...this.state.messages,data]});
      }
    });

  }

  render(){
    return (
      <div className="App">
          <BrowserRouter>
            <header className="navigation-wrapper">
              <Container>
                <TopMenu />
              </Container>       
            </header>
              <div className="main-content" text="true">
                <Switch>
    
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/myTrackers" component={MyTrackers} />
                  <Route path="/res-monitor" component={ResMonitor} />
                  <Route path="/tracker/:imei" component={TrackerView} />
                  <Route path="/map" component={MapView} />
                  <Route path="/yassine" component={Yassine} />
                  
                  <Route component={ErrorPage} />
                </Switch>
              </div>
          </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
