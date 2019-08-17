import React, { Component } from 'react';
import MonitorTable from '../Components/Lists/MonitorTable.jsx';

export default class ResMonitor extends Component {

  constructor()
  {
    super();
    this.state = {
      devices : [{id:1,name:"test",protocol:"web"}]
    };
  }
  
  componentWillMount()
  {

  }

  componentWillUnmount()
  {

  }

 

  render() {
    const OnSelect = (e) =>{
      console.log(e);
    }
    return (
      <div>
        <h1>Connected Devices : </h1>
        <MonitorTable items={this.state.devices} OnSelect={OnSelect}/>
      </div>
    )
  }
}
