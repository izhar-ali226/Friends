import { Avatar } from 'antd';
import { collection, query, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from "react"
import {db } from '../firebase'
import React from 'react';
import './post.css';

function Post(props) {
    const [posts, setPosts] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    // console.log("propns name",props.name)

    let getLocalStorage = localStorage.getItem("userdata");
    getLocalStorage = JSON.parse(getLocalStorage);

    // console.log(url);
    useEffect(() => {
        if (getLocalStorage) {
            const q = query(collection(db, "postImages"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
                const allPosts = [];
                querySnapshot.forEach((doc) => {
                    allPosts.push(doc.data())
                });
                setPosts(allPosts)
            });
        }
    }, []) 
    
   
    useEffect(() => {
        if (getLocalStorage) {
            const q = query(collection(db, "users"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
                const usersdparr = [];
                querySnapshot.forEach((doc) => {
                    usersdparr.push(doc.data())
                });
                setUserProfile(usersdparr)
            });
        }
    }, [])

    let message = '';
    let url = '';
    let postId = ''

    const showPosts = posts.map((element, pos) => {
        message = element.message;
        url = element.urlsrc;
        postId = element.postId;
        
        return (
            <div className="post">
            <div className="post_top">
                <Avatar   className="post_avatar" />
                <div className="post_topInfo">
                    <h3> {props.name}</h3>
                </div>
            </div>
            <div className="post_bottom">
                <p>{message}</p>
            </div>
            <div className="post_img">
                <img src={url} alt=""/>
            </div>
        </div>
        )

    })
    return (showPosts)
}

export default Post
