import React, { Component } from 'react';
import mqtt from 'mqtt';

import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

export default class CANCOM extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      client:mqtt.connect("ws://41.140.242.182:1890/",{clientId:"webUser/"+Math.floor(Math.random()*100)}),
      subTopic:"STM_DACIA/cout",
      pubTopic:"STM_DACIA/cin",
    }
  }

  componentDidMount()
  {
    const { client, subTopic } = this.state;

    client.on("connect",()=>{
      addResponseMessage("Connected !");
      console.log("connected to DACIA");
      client.subscribe(subTopic);
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
      
      console.log(Date.now()+" - ["+topic+"] => "+context);
      addResponseMessage(context);
    });
  }

  handleNewUserMessage(newMessage) {
    const { client, pubTopic } = this.state;
    console.log(`New message incoming! ${newMessage}`);
    client.publish(pubTopic,newMessage);
  }

  render() {
      return (
          <div>
              <Widget
                handleNewUserMessage={this.handleNewUserMessage.bind(this)}
                profileAvatar="http://41.140.242.182/eXPPanel/images/car.png"
                title="CANCOM"
                subtitle="Vehicule Can Communication Interface"
              />
          </div>
      );
  }

}
