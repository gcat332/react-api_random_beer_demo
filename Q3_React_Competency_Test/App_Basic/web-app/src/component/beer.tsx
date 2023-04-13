import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./beer.css";
import loading from "../assets/loading.gif";

const Beer: any = () => {
  // Initial Theme setup
  const [bodyTheme,setBodyTheme] = useState("lightTheme")
  const switchTheme:any = () => {
    if (bodyTheme == "lightTheme")
    {
      setBodyTheme("darkTheme")
    } else {setBodyTheme("lightTheme")}
  }


  // Initial HTML for contain beer data
  const [innerContent, setInnerContent] = useState(
    <>
      <div className="loadingIcon">
        <img src={loading} alt="loading.." width="500px" />
      </div>
      <div className="loadingMsg">
        <h1>Loading...</h1>
      </div>
    </>
  );

  // Initial Loading state
  const [loadingState, setLoadingState] = useState(true);

  // Initial state for Beer value and Toggle value
  const [beerValue, setBeerValue] = useState([null]);
  const [toggle, setToggle] = useState(true);

  // Initial value for previous state (for back button), and enable, disable button
  const prevBeer: any = useRef([null]);
  const [buttonStatus, setButtonStatus] = useState(true);

  // function get random beer from API
  const getNewBeer: any = async () => {
    prevBeer.current = beerValue;
    await axios
      .get("http://localhost:5000/beer/random")
      .then(async (res) => {
        await setToggle(true);
        return setBeerValue([
          res.data.id,
          res.data.uid,
          res.data.brand,
          res.data.name,
          res.data.style,
          res.data.hop,
          res.data.yeast,
          res.data.malts,
          res.data.ibu,
          res.data.alcohol,
          res.data.blg,
          res.data.randomCount,
        ]);
      })
      .catch((err) => {
        return setBeerValue([
          err.message,
          err.message,
          err.message,
          err.message,
          err.message,
          err.message,
          err.message,
          err.message,
          err.message,
          err.message,
          err.message,
          err.message,
        ]);
      });
  };

  // function return previous beer inner content
  const returnPrevBeer: any = async () => {
    setInnerContent(
      <>
        <p className="dataBox">
          <b>ID :</b> {prevBeer.current[0]}
        </p>
        <p className="dataBox">
          <b>uID :</b> {prevBeer.current[1]}
        </p>
        <p className="dataBox">
          <b>Brand :</b> {prevBeer.current[2]}
        </p>
        <p className="dataBox">
          <b>Name :</b> {prevBeer.current[3]}
        </p>
        <p className="dataBox">
          <b>Style :</b> {prevBeer.current[4]}
        </p>
        <p className="dataBox">
          <b>Hop :</b> {prevBeer.current[5]}
        </p>
        <p className="dataBox">
          <b>Yeast :</b> {prevBeer.current[6]}
        </p>
        <p className="dataBox">
          <b>Malt :</b> {prevBeer.current[7]}
        </p>
        <p className="dataBox">
          <b>IBU :</b> {prevBeer.current[8]}
        </p>
        <p className="dataBox">
          <b>Alcohol :</b> {prevBeer.current[9]}
        </p>
        <p className="dataBox">
          <b>Blg :</b> {prevBeer.current[10]}
        </p>
        <p className="dataBox">
          <b>RandomCount :</b> {prevBeer.current[11]}
        </p>
      </>
    );
  };

  // Catch toggle_state, if state change => get new data and replaced
  useEffect(() => {
    // Check Loading State
    if (loadingState === true) {
      setLoadingState(false);
    } else {
      setInnerContent(
        <>
          <p className="dataBox">
            <b>ID :</b> {beerValue[0]}
          </p>
          <p className="dataBox">
            <b>uID :</b> {beerValue[1]}
          </p>
          <p className="dataBox">
            <b>Brand :</b> {beerValue[2]}
          </p>
          <p className="dataBox">
            <b>Name :</b> {beerValue[3]}
          </p>
          <p className="dataBox">
            <b>Style :</b> {beerValue[4]}
          </p>
          <p className="dataBox">
            <b>Hop :</b> {beerValue[5]}
          </p>
          <p className="dataBox">
            <b>Yeast :</b> {beerValue[6]}
          </p>
          <p className="dataBox">
            <b>Malt :</b> {beerValue[7]}
          </p>
          <p className="dataBox">
            <b>IBU :</b> {beerValue[8]}
          </p>
          <p className="dataBox">
            <b>Alcohol :</b> {beerValue[9]}
          </p>
          <p className="dataBox">
            <b>Blg :</b> {beerValue[10]}
          </p>
          <p className="dataBox">
            <b>RandomCount :</b> {beerValue[11]}
          </p>
        </>
      );
    }

    // Check toggle switch
    if (toggle === false) {
      getNewBeer();
    }

    // Enable button when previous state found data
    if (prevBeer.current[0] != null) {
      setButtonStatus(false);
    }
  }, [!toggle]);

  // Return HTML
  return (
    <>
      <div className={bodyTheme}>

      <button className="theme-button" onClick={() => {switchTheme()}}>เปลี่ยนธีม!</button>
        <h1 className="nav">สุ่มเบียร์ V.1</h1>
        <div className="beer-container">{innerContent}</div>
        <div className="button-container">
          <button className="button" onClick={() => {setToggle(false)}}>สุ่มขวดใหม่ต่อ</button>
          <button className="button" disabled={buttonStatus} onClick={() => {returnPrevBeer()}}>ขอขวดเดิมดีกว่า</button>
        </div>
      </div>
    </>
  );
};

export default Beer;
