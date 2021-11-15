import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Geocode from 'react-geocode';
import axios from 'axios';
import Login from './components/login/login';
import Register from './components/register/register';
import Logout from './components/logout/logout';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import EditProfile from './components/editProfile/editProfile';
import PaintballChat from './components/chat/chat';
import CreateListing from './components/createListing/createListing';
import ViewListing from './components/viewListings/viewListings';
import Profile from './components/profile/profile';
import Avatar from './components/avatar/avatar';
import Weather from './components/weather/weather';

Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      loggedInUser: null,
      listedUsers: [],
      listedUser: null,
      listing: null,
      reviews: []
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

  setLoggedInUser = async (userId) => {
    try{
      const jwt = localStorage.getItem('token');
      let response = await axios.get(`http://localhost:8000/api/auth/get/${userId}/`, { headers: {Authorization: 'Bearer ' + jwt}});
      this.setState({
        loggedInUser: response.data
      }, ()=> {
        this.updateLatLng(this.state.loggedInUser, userId);
      })
    }
        
    catch(ex){
        console.log('Error in setLoggedInUser API call', ex)
    }
  }

  updateLatLng = (loggedInUser, userId) => {
    Geocode.fromAddress(loggedInUser.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.updateUsersLatLng(userId, lat, lng);
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setListedUsers = (listedUsers) => {
    this.setState({
      listedUsers: listedUsers
    })
  }

  setListedUserState = (listedUser) => {
    this.setState({
      listedUser: listedUser
    })
  }

  setListing = (listing) => {
    this.setState({
      listing: listing
    })
  }

  updateUsersLatLng = async (userId, lat, lng) => {
    try{
      let updatedProfile = {
        lat: lat,
        lng: lng
      };
      const jwt = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/auth/put/${userId}/`, updatedProfile, { headers: {Authorization: 'Bearer ' + jwt}});
    }
        
    catch(ex){
      console.log('Error in updateUsersLatLng API call', ex)
    }
  }

  setReviews = (reviews) => {
    this.setState({
      reviews: reviews
    })
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
          <Route exact path ="/" render={props => <Home {...props} user={this.state.user} setLoggedInUser={this.setLoggedInUser} />} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/editProfile" render={props => <EditProfile {...props} user={this.state.user} loggedInUser={this.state.loggedInUser} />} />
          <Route path="/avatar" render={props => <Avatar {...props} loggedInUser={this.state.loggedInUser} />} />
          <Route path="/chat" render={props => <PaintballChat {...props} user={this.state.user} loggedInUser={this.state.loggedInUser}/>} />
          <Route path="/viewListings" render={props => <ViewListing {...props} user={this.state.user} listing={this.state.listing} setListing={this.setListing} setListedUsers={this.setListedUsers} setListedUserState={this.setListedUserState} listedUsers={this.state.listedUsers} listedUser={this.state.listedUser} loggedInUser={this.state.loggedInUser}/>} />
          <Route path="/createListing" render={props => <CreateListing {...props} user={this.state.user} />} />
          <Route path="/profile" render={props => <Profile {...props} user={this.state.user} setReviews={this.setReviews} reviews={this.state.reviews} listedUser={this.state.listedUser} />} />
          <Route path="/weather" render={props => <Weather {...props} user={this.state.user} listedUser={this.state.listedUser} listing={this.state.listing} />} />
        </Switch>
      </Router>
    )
  }
}

export default App;