import Event from "./containers/Kengreg";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import eventToDev from "./config/eventToDev.json";

const eventName = eventToDev[0].event;
const eventOption = eventToDev[0].option;
const urlName = eventToDev[0].urlName;
function App() {
  const [navBar, setNavBar] = useState(false);
  return (
    <Router>
      {navBar ? <NavBar typePage={eventOption} /> : null}
      <Event
        setNavBar={setNavBar}
        eventOption={eventOption}
        urlName={urlName}
      />
    </Router>
  );
}

export default App;
