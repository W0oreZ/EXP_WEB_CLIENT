import React from 'react';
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

import "./App.css";
import { Container } from 'semantic-ui-react';

class App extends React.Component {
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
                  
                  <Route component={ErrorPage} />
                </Switch>
              </div>
          </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
