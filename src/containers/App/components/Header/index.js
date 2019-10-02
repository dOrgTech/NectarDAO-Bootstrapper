import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AccountBalance from '@material-ui/icons/AccountBalance'
import Assignment from '@material-ui/icons/Assignment'
import SwapHoriz from '@material-ui/icons/SwapHoriz'

import AppBar from 'components/AppBar'
import { getProvider } from 'core/services/providerService'
import { appConfig } from 'configs/config-main'
import { styles } from './styles.scss'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorElement: null,
      address: ''
    }
  }

  getMenu() {
    const { anchorElement, address } = this.state
    this.checkAccount()
    return (
      <div>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className="dropdown"
          aria-owns={anchorElement ? 'simple-menu' : null}
          onClick={this.handleClick}
        >
          <h4> {address} </h4><AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={this.close}
        >
          <MenuItem data-link="account" onClick={this.goTo}>Menu Option 1</MenuItem>
          <MenuItem data-link="settings" onClick={this.goTo}>Menu Option 2</MenuItem>
        </Menu>
      </div>
    )
  }

  checkAccount = () => {
    getProvider().then((provider) => {
      if (provider.result === 'success') {
        this.setState({ address: provider.web3Provider.eth.defaultAccount })
      }
    })
  }

  goTo = (event) => {
    const { history } = this.props
    const { link } = event.currentTarget.dataset

    history.push(link)
    this.close()
  }

  handleClick = (event) => {
    this.setState({ anchorElement: event.currentTarget })
  }

  close = () => {
    this.setState({ anchorElement: null })
  }

  render() {
    const menu = this.getMenu()

    return (
      <div className={styles}>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              {appConfig.name}
            </Typography>
            <Link className="menu-icon" href="/lock" to="/lock">
              <IconButton color="inherit" aria-label="menu">
                <SwapHoriz />
                <Typography variant="title" color="inherit">
                  Lock
                </Typography>
              </IconButton>
            </Link>
            <Link className="menu-icon" href="/snapshot" to="/snapshot">
              <IconButton color="inherit" aria-label="menu">
                <AccountBalance />
                <Typography variant="title" color="inherit">
                  Snapshot
                </Typography>
              </IconButton>
            </Link>
            <Link className="menu-icon" href="/auction" to="/auction">
              <IconButton color="inherit" aria-label="menu">
                <Assignment />
                <Typography variant="title" color="inherit">
                  Auction
                </Typography>
              </IconButton>
            </Link>
            {menu}
          </Toolbar>
        </AppBar>
      </div >
    )
  }
}

Header.propTypes = {
  history: PropTypes.shape({}).isRequired
}

export default withRouter(Header)
