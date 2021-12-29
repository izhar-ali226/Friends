import "./home.css";
import Feed from '../messageSender/messageSender'
import React, { useState, useEffect } from "react";
import { Form, Button, Avatar } from "antd";
import { Menu } from 'antd';
import { Image } from 'antd';
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import {setDoc, doc, query, onSnapshot, collection } from "@firebase/firestore";
import { storage, ref, db } from "../firebase";
import SearchBar from "../searchBar/SearchBar";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router';
import {onAuthStateChanged } from "firebase/auth";
import logo from '../../../src/logo.png'




function Home() {
  let navigate = useNavigate();
const logout=()=>{
  const auth = getAuth();
  signOut(auth).then(() => {
    navigate("/signup")
  }).catch((error) => {
    console.log(' not logout')
  });
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

  } else {
    logout()
  }
});
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

const { SubMenu } = Menu;


    
    return (
      <>
      <div>
      <Menu  mode="horizontal">
        <Menu.Item >
      <Image  
        width={200}
        preview={false}
        src={logo}>
        </Image>
        </Menu.Item>
        <Menu.Item key="app" >
        <Avatar className="headerAvator " src={url} size={44} icon={<UserOutlined />} />
        <span className="headerSpan">{names}</span>
        </Menu.Item>
        <Menu.Item key="app" icon={<SettingOutlined style={{ fontSize: '150%', margin: '14px 8px'}} />} title="Setting">Setting</Menu.Item>
      <form className="logoutCss" onClick={logout}>
        <button className="logoutCsss">Logout</button>
      </form>
      </Menu>
      </div>
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
    </>
  );
}

export default Home;
