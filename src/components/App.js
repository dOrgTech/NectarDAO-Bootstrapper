import React from 'react'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import 'components/App.scss'
import ReputationBoostrapper from 'components/pages/ReputationBootstrapper'
import Web3Manager from 'components/shell/Web3Manager'
import HomePage from './pages/HomePage'
import Beehive from './pages/Beehive'
import BeehiveGuide from './pages/Beehive/BeehiveGuide'
import styled from 'styled-components'
import { Typography, Button, ThemeProvider } from '@material-ui/core'
import NectarLogo from 'assets/pngs/NECwithoutText.png'
import HexagonsBackground from 'assets/svgs/hexagonsBackground.svg'
import { NectarTheme } from './theme'

const AppBody = styled.div`
  height: calc(100% - 98px);
  max-height: calc(100% - 98px);
  overflow-y: auto;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background: transparent;
`

const Footer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 98px;
  background-color: #061722;
`

const FooterText = styled(Typography)`
  color: rgba(169, 171, 203, 0.5);
  font-size: 14px;
  text-align: right;
  padding-right: 166px;
`

const Logo = styled.img`
  padding-left: 166px;
  height: 32px;
  width: 32px;
`

const HeaderButton = styled.div`
  padding-right: 166px;
`

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(4.5deg, #040E14 19.19%, #061824 88.66%);
`

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
`


@inject('root')
@observer
class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={NectarTheme}>
        <AppWrapper>
          <BackgroundWrapper style={{ backgroundImage: `url(${HexagonsBackground})` }}>
            <AppBody>
              <Header>
                <Logo src={NectarLogo} />
                <HeaderButton>
                  <Button variant={'outlined'} color={'primary'}>DeversiFi</Button>
                </HeaderButton>
              </Header>
              <HashRouter>
                <Web3Manager>
                  <Switch>
                    <Route path="/beehive">
                      <Beehive />
                    </Route>
                    <Route path="/lock-nec">
                      <ReputationBoostrapper />
                    </Route>
                    <Route path="/beehive-guide">
                      <BeehiveGuide />
                    </Route>
                    <Route path="/">
                      <HomePage />
                    </Route>
                  </Switch>
                </Web3Manager>
              </HashRouter>
            </AppBody>
            <Footer>
              <Logo src={NectarLogo} />
              <FooterText>Copyright @2020 DeversiFi</FooterText>
            </Footer>
          </BackgroundWrapper>
        </AppWrapper>
      </ThemeProvider>
    )
  }

}

export default App