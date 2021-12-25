import "./home.css";
import Feed from '../messageSender/messageSender'
import React, { useState, useEffect } from "react";
import { Form, Button, Avatar } from "antd";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import {setDoc, doc, query, onSnapshot, collection } from "@firebase/firestore";
import { storage, ref, db } from "../firebase";
import SearchBar from "../searchBar/SearchBar";

function Home() {
  const [progress, setProgress] = useState(0);
//   const [images, setImage] = useState([]);
  const [usersdp, setUsersdp] = useState([]);
  const [users, setUsers] = useState([]);

//   getting localstorage id 
  let getLocalStorage = localStorage.getItem("userdata");
  getLocalStorage = JSON.parse(getLocalStorage);


//   submit button function
  const handleUploadImage = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };


//   firebase and main funtionality
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // const uid = file.uid;
    uploadTask.on(
      "state changed",
      (snapshot) => {
        const progress1 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress1);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDoc(doc(db, "users", getLocalStorage.uid), {
            urlsrc: url,
            userid: getLocalStorage.uid,
          });
        });
      }
    );
  };

 
  useEffect(() => {
    if (getLocalStorage) {
        const q = query(collection(db, "Contact Info"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const usersArr = [];
            querySnapshot.forEach((doc) => {
            usersArr.push(doc.data())
            });
            setUsers(usersArr)
        });
    }
}, [])
let names = "";

users.map((element, pos) => {
        names = element.name;  
})

// console.log("name here" + names);
useEffect(() => {
    if (getLocalStorage) {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const usersdparr = [];
            querySnapshot.forEach((doc) => {
                usersdparr.push(doc.data())
            });
            setUsersdp(usersdparr)
        });
    }
}, [])

let url = ""
usersdp.map((element) => {
    if (getLocalStorage.uid === element.userid) {
        url=element.urlsrc;
       
    }
})
// console.log("image here " + url);




    
    return (
    <div>
      <form className="form" onSubmit={handleUploadImage}>
        <InboxOutlined className=".ant-upload" />
        <input className="fileInput" type="file" />
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <progress className="progress" value={progress} max="100" />
      </form>   
        <div> 
        <Avatar src={url} size={64} icon={<UserOutlined />} />
        <h2>{names}</h2>
        </div>
        <SearchBar placeholder="Search" />
          <Feed/>
    </div>
  );
}

export default Home;
