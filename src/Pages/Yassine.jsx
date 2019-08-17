import React from 'react';
import socketIOClient from "socket.io-client";
import Plotly from 'plotly.js';
import { Grid, Segment } from 'semantic-ui-react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      connected:false,
      counter:0,
      socket:socketIOClient("41.140.242.182:7700"),
      set_point:0,
      input:0,
      status:0
    }
  }

  componentDidMount() {
    const { socket } = this.state;

    socket.on("SerialMonitor/yassine_out/io", data =>{
      const newsensors = JSON.parse(data);
      this.setState({
        set_point:newsensors[0],
        input:newsensors[1],
        status:newsensors[2],
        counter:this.state.counter+1
      })

      //appendDataToChart(data[0].value)
      Plotly.extendTraces('chart',{y:[[parseFloat(this.state.set_point)]]},[0]);
      Plotly.extendTraces('chart2',{y:[[parseFloat(this.state.input)]]},[0]);
      Plotly.extendTraces('chart3',{y:[[parseInt(this.state.status)]]},[0]);

      const {set_point, input} = this.state;
      Plotly.extendTraces('testchart', {y: [[parseFloat(set_point)], [parseFloat(input)]]}, [0, 1])
      

      if(this.state.counter>100){
        Plotly.relayout('chart',{
          xaxis:{
            range:[this.state.counter-50,this.state.counter]
          }
        })
        Plotly.relayout('chart2',{
          xaxis:{
            range:[this.state.counter-50,this.state.counter]
          }
        })
        Plotly.relayout('chart3',{
          xaxis:{
            range:[this.state.counter-50,this.state.counter]
          }
        })
        Plotly.relayout('testchart',{
          xaxis:{
            range:[this.state.counter-50,this.state.counter]
          }
        })
      }
      console.log(data);
    });

    var FIXED_TEMPERATURE = {
      y: [],
      type: 'scatter',
      name: 'FIXED_TEMPERATURE'
    };
    
    var CURRENT_TEMPERATURE = {
      y: [],
      type: 'scatter',
      name: 'CURRENT_TEMPERATURE'
    };

    var layout = {
      xaxis: {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false
      },
      autosize: true,
      width: 1980,
      height: 1080,
    };

    var data = [FIXED_TEMPERATURE, CURRENT_TEMPERATURE];

    Plotly.plot('testchart', data, layout);

    Plotly.plot('chart',[{
      y:[],
      type:'line'
    }])
    Plotly.plot('chart2',[{
      y:[],
      type:'line'
    }])
    Plotly.plot('chart3',[{
      y:[],
      type:'line'
    }])
  }

  componentWillUnmount() {
    this.state.socket.close();
    this.setState({ socket: null });
  }

  render(){
  return (
    <div>
      <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment><h1>Incubator status</h1></Segment>
              <center><div id="testchart"></div></center>
              <hr/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Segment>
                <h2>SET_POINT</h2>
                <div id="chart"></div>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <h2>INPUT</h2>
                <div id="chart2"></div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <h2>OUTPUT</h2>
                <div id="chart3"></div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </div>  
  )}
}

export default App;
