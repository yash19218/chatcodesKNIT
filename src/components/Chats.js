import React , {useRef,useState,useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import {  ChatEngine } from 'react-chat-engine';
import { authentication } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';//for making diffrent api's call!

const Chats = () =>{
    const history = useHistory();
    const {user}  = useAuth();
    const [loading,setLoading]=useState(true);

    console.log('User',user);

    const handleLogout = async () => {
        await authentication.signOut();
        history.push('/');
    }

    const getFile  = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data],"userPhoto.jpg",{type:'image/jpeg'});
    }

    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }
        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "project-id":process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name":user.email,
                "user-secret":user.uid
            }
        })
        .then(()=>{
            setLoading(false);}
        )
        .catch(()=>{
            let formData = new FormData();
            formData.append('email',user.email);
            formData.append('username',user.email);
            formData.append('secret',user.uid);
            getFile(user.photoURL)
                .then((avatar)=>{
                    formData.append('avatar',avatar,avatar.name);

                    axios.post('https://api.chatengine.io/users',
                         formData,
                         {headers:{"private-key":process.env.REACT_APP_CHAT_ENGINE_KEY}}
                    )
                    .then(()=>setLoading(false))
                    .catch((err)=>console.log(err))
                });
        });

    },[user,history])

    if(!user || loading) return 'Loading...';

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
                    projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                    userName={user.email}
                    userSecret={user.uid}
                />
        </div>
    );
}

export default Chats;