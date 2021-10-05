import { MainContextProvider } from '../context/MainContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from '../components/Navigation';
import * as ROUTES from "./constants/routes";
import PrivateRoute from './PrivateRoutes';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import About from './About';
import MyAds from './MyAds';
// Style
import { GlobalStyles } from '../style/mainStyles';
import StyledContainer from '../style/Container';
import NewAd from './NewAd';
import AdDetails from './AdDetails';
import StartPage from './StartPage';

const App = () => {

  return (<>
    <Router>
      <GlobalStyles />

      <MainContextProvider>
        <StyledContainer>
          <Switch>
            <Route path={ROUTES.START_PAGE} component={StartPage} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <Route path={ROUTES.LOG_IN} component={Login} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path={ROUTES.DASHBOARD} component={Dashboard} />
            <PrivateRoute path={ROUTES.PROFILE} component={Profile} />
            <PrivateRoute path={ROUTES.ABOUT} component={About} />
            <PrivateRoute path={ROUTES.NEWAD} component={NewAd} />
            <PrivateRoute path={ROUTES.MYADS} component={MyAds} />
            <PrivateRoute path={ROUTES.ADDETAILS} component={AdDetails} />
          </Switch>
        </StyledContainer>
        <Navigation />
      </MainContextProvider>

      {/* </ThemeProvider> */}
    </Router>
  </>);
}

export default App;
