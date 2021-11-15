import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import './avatar.css'

function Avatar(props) {

  const [ avatar, setAvatar ] = useState();
  const history = useHistory();

  const updateAvatar = async () => {
      try{
          const jwt = localStorage.getItem('token');
          let newAvatar = new FormData();
          newAvatar.append('avatar', avatar);
          await axios.put(`http://localhost:8000/api/auth/put/${props.loggedInUser.id}/`, newAvatar, { headers: {Authorization: 'Bearer ' + jwt}});
          history.push('/')
      }
          
      catch(ex){
          console.log('Error in updateAvatar API call', ex)
      }
  }

  return (
    <div className="container-fluid">
        <div className="row avatar-margin" />
        <div className="row">
            <div className="col-2 gutter" />
            <div className="col-8 pad-avatar">
                <h2>Upload Avatar</h2>
                <label>Avatar: <input type="file" accept="image/*" onChange={event => setAvatar(event.target.files[0])} /></label>
                <br/>
                <button className="btn btn-primary button-avatar" onClick={()=> updateAvatar()}>Submit</button>
            </div>
            <div className="col-2 gutter" />
        </div>
    </div>
  );
}

export default Avatar;