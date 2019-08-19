import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { iconTracker } from "./../resource/map/icons.jsx";
import loading from "./../resource/images/loading.gif";

import { Grid, Segment, Button } from 'semantic-ui-react';

import CANCOM from './../Components/CANCOM.jsx';

import "leaflet/dist/leaflet.css";
import CAMERA from '../Components/CAMERA.jsx';

export default class MapView extends Component {

  constructor()
  {
    super();
    this.state = {
      loadingimg:loading,
      trackers:[],
      socket:socketIOClient("41.140.242.182:7700"),
      map:{
        following:"123123",
        ActiveControl: "none",
        center:[32.22346722409689, -9.243836425987254],
        zoomLevel: 15,
        maptype: "sat",
        markers: [
          {
            id: 1,
            icon: iconTracker,
            position: [10, 11],
            visible: true,
            temp: false
          },
          {
            id: 2,
            icon: iconTracker,
            position: [32, -9],
            visible: true,
            temp: false
          }
        ]
      },
      errors: {}
    };

    this.UpdateMarkers = this.UpdateMarkers.bind(this);
    this.FollowTarget = this.FollowTarget.bind(this);
    this.handleFollowChange = this.handleFollowChange.bind(this);
  };
  
  componentDidMount()
  {
    const { socket } = this.state;

    socket.on("eXPTracker/io", data =>{
        const trackerData = JSON.parse(data);
        //console.log(data);
        this.UpdateMarkers(trackerData);
    });
  }

  componentWillUnmount()
  {

  }

  render() {
    const TrackerList = this.state.trackers.map(tracker=>{
      const txt = this.state.map.following === tracker.imei ? "UnFollow" : "Follow";
      return(
        <div key={tracker.imei}>
          <p>{tracker.imei} - {tracker.name}</p>
          <Button primary onClick={this.handleFollowChange.bind(null,tracker.imei)}>{txt}</Button>
          <br/>
          <hr/>          
        </div>
      )
    });

    const Markers = this.state.trackers.map(tracker=>{
      return(
        <Marker key={tracker.imei} icon={iconTracker} position={[tracker.lat,tracker.lng]}>
          <Popup>
            {tracker.name}
            <br />
            date : {tracker.dt_tracker}
            <br />
            engine : {tracker.speed > 5 ? ("on") : ("off")}
            <br />
            Speed : {tracker.speed}
            <br />
            IMEI : {tracker.imei}
            <br />
            <br />
            params : Soon...
          </Popup>
        </Marker>
      )
    });
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment><h1>Real-Time Position</h1></Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment>
                <div className="map-wrapper">
                  <Map
                  className="map"
                  center={this.state.map.center}
                  zoom={this.state.map.zoomLevel}
                  onzoom={this.handlezoomChange.bind(this)}>

                    <TileLayer
                    attribution='<a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url={this.state.map.maptype === "tra" ? "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidzBvcmV6IiwiYSI6ImNqdXY2NmRzcDBuem80M29hYWltaTZlemUifQ.rwqKHNxXD9Zzi6fQmgNgTQ" :
                    "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidzBvcmV6IiwiYSI6ImNqdXY2NmRzcDBuem80M29hYWltaTZlemUifQ.rwqKHNxXD9Zzi6fQmgNgTQ"}/>

                    {Markers}
                  
                  </Map>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment><h4>Connected Trackers</h4></Segment>
              {TrackerList}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Segment><h4>Available Cameras</h4></Segment>
              No Camera Available.....
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment><h4>Camera View</h4></Segment>
              <center>
                <CAMERA />
              </center>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <CANCOM />
      </div>
    )
  }

  handlezoomChange(event) {
    let newZoom = event.target._zoom;

    if (newZoom < 18 && newZoom > 3) this.setState({ map:{...this.state.map,zoomLevel: newZoom }});
  }

  handleFollowChange(imei)
  {
    if(imei === this.state.map.following)
    {
      this.setState({map:{...this.state.map,following:"none"}});
    }
    else
    {
      this.setState({map:{...this.state.map,following:imei}});
    }
  }

  //functions**************

  UpdateMarkers(data)
  {
    let newdata = false;
    let trackers = this.state.trackers;

    for (let i = 0; i < trackers.length; i++) {
      const tracker = trackers[i];
      if(tracker.imei === data.imei)
      {
        newdata = i;
        break;
      }
    }

    if(newdata === false)
    {
      this.setState({trackers:[...this.state.trackers,data]});
    }
    else
    {
      trackers[newdata] = data;
      this.setState({trackers:trackers});
    }

    if(this.state.map.following === data.imei)
    {
      this.FollowTarget(data.imei,[data.lat,data.lng]);
    }
  }

  FollowTarget(imei,position)
  {
    this.setState({map:{...this.state.map,center:position}});
  }
}
