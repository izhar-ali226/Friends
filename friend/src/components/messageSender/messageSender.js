import React, { useState, useEffect } from 'react';
import "./messageSender.css";
import { setDoc, doc , onSnapshot, query, collection } from '@firebase/firestore';
import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage, ref, db } from "../firebase";
import Post from '../posts/Post'

function MessageSender() {
    const [message, setMessage] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [users, setUsers] = useState([]);
    
    //   getting localstorage id 
    let getLocalStorage = localStorage.getItem("userdata");
    getLocalStorage = JSON.parse(getLocalStorage);
    // console.log("username " + getLocalStorage.uid)
    //   console.log(getLocalStorage)
    
//   submit button function
  const handleImage = (e) => {
    setSelectedFile(e.target.files[0]);
};

const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(selectedFile)
    uploadFiles(selectedFile);
  }


//   firebase and main funtionality
  const uploadFiles = (selectedFile) => {
    let postuid = new Date().getTime()
    // console.log(postuid)
    let getLocalStorage = localStorage.getItem("userdata");
    getLocalStorage = JSON.parse(getLocalStorage);
    if (!selectedFile) return;
    const storageRef = ref(storage, `posts/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    // const uid = file.uid;
    uploadTask.on(
      "state changed",
      (snapshot) => {
        // console.log(snapshot)
        console.log("snapshot")
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDoc(doc(db, "postImages", `${postuid}` ), {
            // name: username,
            message: message,
            urlsrc: url,
            postid : postuid,
            // userid: getLocalStorage.uid,
          });
        });
      }
    );
  
    setMessage("");
    // setImg('')
  };

  
  useEffect(() => {
    if (getLocalStorage) {
        const q = query(collection(db, "Contact Info"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const allusers = [];
            querySnapshot.forEach((doc) => {
            allusers.push(doc.data())
            });
            setUsers(allusers)
        });

    }
}, [])

// console.log(users)


let names=''
  users.map((element, pos) => {
    
    names = element.name;  
    // console.log(names)
})
 


    return (
        <div className="messageSender">
            <div className="messageSenderTop">
                <form onSubmit={handleSubmit}>
                    <input className="messageSender_input"
                        placeholder={` Whats on your Mind , ${names}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text" />
                    <input type='file' placeholder="image" onChange={handleImage} />
                </form>
            </div>
            <Post name={names} />
        </div>
    )
}
export default MessageSender;