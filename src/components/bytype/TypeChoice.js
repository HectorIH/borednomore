import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";

function TypeChoice(props) {
  const [state, setState] = useState({
    id: "",
    activity: "",
    accessibility: 0,
    type: "",
    price: 0,
    participants: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const choice = props.match.params.type;

        const response = await axios.get(
          `http://www.boredapi.com/api/activity?type=${choice}`
        );

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [props]);

  function openTab() {
    window.open(state.link);
  }

  return (
    <div>
      <Navbar />
      <div key={state.id} className="random">
        <h3>{state.activity ? state.activity.toLowerCase() : ""}</h3>
        <div className="random-p">
          <p>accessibility: {state.accessibility}</p>
          <p>type: {state.type}</p>
          <p>number of participants: {state.participants}</p>
          <p>price: {state.price === 0 ? "free" : state.price}</p>
          <Link onClick={openTab} className="external-link">
            <p>{state.link ? "hint" : ""}</p>
          </Link>
        </div>
        <Link to="/type">
          <button className="go-back">go back</button>
        </Link>
      </div>
    </div>
  );
}

export default TypeChoice;
