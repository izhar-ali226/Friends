import React, { useState, useEffect } from 'react';
import './searchBar.css'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { query, onSnapshot, collection } from "@firebase/firestore";
import { db } from "../firebase";
import { Link } from 'react-router-dom';



function SearchBar({ placeholder }) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);

  let getLocalStorage = localStorage.getItem("userdata");
  getLocalStorage = JSON.parse(getLocalStorage);

  useEffect(() => {
    if (getLocalStorage) {
      const q = query(collection(db, "Contact Info"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const usersArr = [];
        querySnapshot.forEach((doc) => {
          usersArr.push(doc.data())
        });
        setData(usersArr)
      });
    }
  }, [])
  let getData = [];
  data.map((element, pos) => {
    getData.push(element.name);
    // console.log("bb",getData)
  });

  let newFilter;
  const handleFilter = (event) => {

    setWordEntered(event.target.value);
    //   console.log("data ",wordEntered)
    newFilter = getData.filter((obj) => {
      return obj.toLowerCase().includes(wordEntered.toLowerCase());
    });

    // console.log("newFilter", newFilter)
    if (wordEntered === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };


  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="search"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchOutlined/>
          ) : (
            <CloseOutlined id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          <Link  to={getData} className="dataItem"  target="_blank">{filteredData}</Link>
          {/* <p>{filteredData} </p> */}
        </div>
      )}
    </div>
  )
}

export default SearchBar
