import React, { Component } from 'react'
import * as providerService from 'core/services/providerService'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import LogTable from 'components/LogTable'

class LogView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
      provider: null,
      logData: {},
      logsLoaded: false,
      pendingRequest: false,
      requestError: null
    }
  }

  async componentWillMount() {
    const { address } = this.props.match.params
    this.setState({ address })

    const provider = await providerService.getProvider()
    this.setState({ provider })
  }

  render() {
    const { address, logData, logsLoaded } = this.state

    if (!logsLoaded) {
      return <div />
    }

    return (
      <Container>
        <Typography variant="h3" component="h3">Call Logs</Typography>
        <br />
        {logsLoaded ? (
          <LogTable logData={logData} />
        ) : (
            <div />
          )}
        <br />
      </Container>
    )
  }
}

export default LogView
