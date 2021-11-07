import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Login from './components/login/login';
import Register from './components/register/register';
import Logout from './components/logout/logout';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import EditProfile from './components/editProfile/editProfile';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    try{
      const user = jwtDecode(jwt);
      this.setState({user});
    } catch (ex){
      console.log('Error in setting user', ex)
    }
  }

  // code for using using hook
  // const [user, setUser] = useState(null);
  // const jwt = localStorage.getItem('token');
  // useEffect(() => {
  //   try{
  //     const localUser = jwtDecode (jwt);
  //     setUser(localUser);
  //   } catch {}
  // }, [])

  render(){
    return (
      <Router>
        <Navbar user={this.state.user}/>  
        <Switch>
          <Route exact path ="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/editProfile" render={props => <EditProfile {...props} user={this.state.user} />} />
        </Switch>
      </Router>
    )
  }
}

export default App;