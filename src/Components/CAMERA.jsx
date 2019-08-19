import React, { Component } from 'react';
import mqtt from 'mqtt';

import loading from './../resource/images/loading.gif';

export default class CAMERA extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      client:mqtt.connect("ws://41.140.242.182:1890/",{clientId:"webUser/"+Math.floor(Math.random()*100)}),
      subTopic:"camera/zerow",
      frame:loading,
      frame2:loading,
      counter2:0,
      counter:0
    }
  }

  componentDidMount()
  {
    const { client, subTopic } = this.state;

    client.on("connect",()=>{
      console.log("connected to server");
      client.subscribe(subTopic);
      client.subscribe("camera/zerow2");
    })

    client.on("message",(topic, message)=>{
      let context;
      try 
      {
        context = message.toString();
      } 
      catch (error) 
      {
        console.error(error.message);
      }

      if(topic === "camera/zerow2")
      {
        this.setState({
          frame2:context,
          counter2: this.state.counter2+1
        })

      }
      else if(topic === "camera/zerow")
      {

        this.setState({
          frame:context,
          counter: this.state.counter+1
        })

      }
      
      //console.log(context);
      

      console.log(this.state.counter2);
    });
  }

  render() {
      return (
          <div>
              <img src={ this.state.counter === 0 ? loading : `data:image/jpg;base64,${this.state.frame}` } width={640} height={480} alt="live" />
              <img src={ this.state.counter2 === 0 ? loading : `data:image/jpg;base64,${this.state.frame2}` } width={640} height={480} alt="live2" />
          </div>
      );
  }

}