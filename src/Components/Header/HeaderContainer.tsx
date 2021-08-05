import axios from 'axios';
import React from 'react';
import Header from './Header';

class HeaderContainer extends React.Component {
  
  componentDidMount() {
    axios.get("https://social-network.samuraijs.com/api/1.0/auth/me")
      .then(responce => {
        debugger
      })
  }

  render () {
    return <Header />
  }
}

export default HeaderContainer;
