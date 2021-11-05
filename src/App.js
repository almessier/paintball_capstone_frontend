import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
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

        </Switch>
      </Router>
    )
  }
}

export default App;