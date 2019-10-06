import React from 'react'

class Updater extends React.Component {
  componentDidMount() {
    this.props.fn()
    this.interval = setInterval(() => this.props.fn(), this.props.ms)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  interval;

  render() {
    return (
      <React.Fragment />
    )
  }
}

export default Updater
