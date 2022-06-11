import React,{ useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './App.css';
const clientId = "42569353863-slkilh68a3e7uplef4kuic81mqvdj6eg.apps.googleusercontent.com";

const App = () => {

  const [loginBtn, setLoginBtn] = useState(true);
  const [logoutBtn, setLogoutBtn] = useState(false);
  const [profile, setProfile] = useState({
    image: '',
    name: '',
    email: '',

  });



  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS CURRENT USER");
    setLoginBtn(false)
    setLogoutBtn(true)
    setProfile({
      image: res.profileObj.imageUrl,
      name: res.profileObj.name,
      email: res.profileObj.email
    });
  }

  const onFailure = (res) => {
    console.log("LOGIN FAILRED: ", res);
  }

  const onLogoutSuccess = () => {
    console.log("LOGOUT SUCCESSFULL!");
    setLoginBtn(true)
    setLogoutBtn(false)
  }

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start)
  },[])


  return (
    <div className='container'>
      <div className='google__login'>
        {
          loginBtn ? 
            <GoogleLogin
              clientId={clientId}
              buttonText="Login With Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
            /> : null
          }
      </div>
      

      {
        logoutBtn ? 
          <div className='profile__container'>
            <div className='profile__box'>
              <img className='image' src={profile.image} alt={profile.name} width="100px" />
              <div className='name'>{profile.name}</div>
              <div className='email'>{profile.email}</div>
              <div className='google__logout'>
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Logout"
                  onLogoutSuccess={onLogoutSuccess}
                /> 
              </div>
            </div>
          </div> : null
      }

    </div>

    )
}

export default App