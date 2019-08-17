import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Image,
  Menu,
} from 'semantic-ui-react'

const TopMenu = () => (
    <Menu fixed='top'>
      <Container>
        <Link to="/">
          <Menu.Item header>
            <Image size='mini' src='/logo_small.png' style={{ marginRight: '1.5em' }} />
            ExpTracker
          </Menu.Item>
        </Link>

        <Menu.Item as='a'><Link to="/myTrackers">My Trackers</Link></Menu.Item>

        <Menu.Item><Link to="/res-monitor">Ressources Monitor</Link></Menu.Item>

        <Menu.Item><Link to="/map">Live MAP</Link></Menu.Item>

        <Menu.Item><Link to="/yassine">Yassine - TEMP</Link></Menu.Item>
      </Container>
    </Menu>
)

export default TopMenu