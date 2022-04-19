import React from 'react';
import { GoogleCircleFilled, FacebookFilled} from '@ant-design/icons';
import { GoogleAuthProvider,FacebookAuthProvider,signInWithRedirect } from 'firebase/auth';
import {authentication} from '../firebase'; 


const Login = () =>{

    return(
        <div id='login-page'>
            <div id='login-card'>
                <h2 style={{color:"white" , fontSize:30}}>Welcome to ChatCodes!</h2>
                <div
                    className='login-button google'
                    onClick={() => signInWithRedirect(authentication,new GoogleAuthProvider())}
                >
                    <GoogleCircleFilled/>Sign In with Google
                </div>
                <br /><br />
                <div 
                    className='login-button facebook' 
                    onClick={() => signInWithRedirect(authentication,new FacebookAuthProvider())}
                >
                    <FacebookFilled/>Sign In with Facebook
                </div>
            </div>
        </div>
    );

}

export default Login;