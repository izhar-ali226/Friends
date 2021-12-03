import { getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import './home.css';
import React, { useState } from 'react'
import { storage, ref } from '../firebase'
import { Form, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';


function Home() {
    const [progress, setProgress] = useState(0)


    const handleUploadImage = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    }

    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            "state chcaged",
            (snapshot) => {
                const progress1 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress1);
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL)
                })
            }
        )
    }

    return (
        <div>
            <form className="form" onSubmit={handleUploadImage} >
                <InboxOutlined  className=".ant-upload" /> 
                <input  className="fileInput" type="file" />
                {/* <button className="fileButton" type="submit" >Upload image</button> */}
                <Form.Item
                    wrapperCol={{
                        span: 12,
                        offset: 6,
                    }}
                >
                    <Button  onSubmit={handleUploadImage} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            <progress className="progress" value={progress} max="100"/>
            </form>
       
        </div >
    )
}

export default Home
