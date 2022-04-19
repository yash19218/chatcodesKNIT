import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { authentication } from '../firebase';

import { useAuth } from '../contexts/AuthContext';

const Chats = () =>{
    const history = useHistory();
    const {user}  = useAuth();
    console.log('User',user);
    const handleLogout = async () => {
        await authentication.signOut();
        history.push('/');
    }

    return (
        <div className='chats-page'>
                <div className='nav-bar'>
                    <div className='logo-tab'>
                        ChatCodes
                    </div>
                    <div onClick={handleLogout} className='logout-tab'>
                        Logout
                    </div>
                </div>

                <ChatEngine
                    height="calc(100vh-66px)"
                    projectID="8febc21e-e228-42ae-a892-f89b512cac13"
                    userName=""
                    userSecret=""
                />
        </div>
    );
}

export default Chats;