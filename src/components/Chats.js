import React , {useRef,useState,useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import {  ChatEngine } from 'react-chat-engine';
import { authentication } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

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
                "project-id":"8febc21e-e228-42ae-a892-f89b512cac13",
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
                         {headers:{"private-key":"7642851b-3929-4a89-9a03-0bb12330949b"}}
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
                    projectID="8febc21e-e228-42ae-a892-f89b512cac13"
                    userName={user.email}
                    userSecret={user.uid}
                />
        </div>
    );
}

export default Chats;