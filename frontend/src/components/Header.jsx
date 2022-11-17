import React from 'react'
import {FaSignInAlt,FaUser,FaUserAlt} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

import {Header,Segment} from 'semantic-ui-react'

function HeaderComponent() {
  const navigate = useNavigate();

  function logOut(){
    localStorage.clear();
    navigate("login");
  }

  return (
    <header className='header'>
      { localStorage.getItem('token'!=null) ?
      <>
      <Segment clearing>
        <Header as='h2' floated='left' color='black'>Flickr</Header>
        <Header as='h3' floated='right' >
          <Link to='register' ><button class="ui secondary button"><FaSignInAlt class="header-btn-icons-align"/>Register</button></Link>
        </Header>
        <Header as='h3' floated='right'>
          <Link to='login' ><button class="ui secondary button"><FaUser class="header-btn-icons-align"/>Login</button></Link>
        </Header>
     </Segment>
      </>
       :
       <>
        { localStorage.getItem('token') ? 
        <Segment clearing>
        <Header as='h2' floated='left' color='black'>Flickr</Header>
        <Header as='h3' floated='right' >
          <Link to='login' ><button class="ui secondary button" onClick={logOut}><FaUserAlt class="header-btn-icons-align"/>Log out</button></Link>
        </Header>
      </Segment>
      :
        <Segment clearing>
        <Header as='h2' floated='left' color='black'>Flickr</Header>
        <Header as='h3' floated='right' >
          <Link to='register' ><button class="ui secondary button"><FaSignInAlt class="header-btn-icons-align"/>Register</button></Link>
        </Header>
        <Header as='h3' floated='right'>
          <Link to='login' ><button class="ui secondary button"><FaUser class="header-btn-icons-align"/>Login</button></Link>
        </Header>
    </Segment>
      }
       </>
    
    }
    
    </header>
  )
}

export default HeaderComponent