import React, { Component } from 'react'
import {
  Header,
} from 'semantic-ui-react'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header as='h1'>Dashboard</Header>
        <p>Tracking systeme Main view - you can view an overview of all your vehicules state in here.</p>
      </div>
    )
  }
}
