import { useState } from "react";
import Contents from "./kengreg/Home";
const Kengreg = ({ setNavBar, eventOption, urlName }) => {
  const [introScreen, setIntroScreen] = useState(false);
  setTimeout(() => {
    setIntroScreen(false);
    setNavBar(false);
  }, 1500);
  return (
    <Contents
      setNavBar={setNavBar}
      eventOption={eventOption}
      urlName={urlName}
      introScreen={introScreen}
    />
  );
};

export default Kengreg;
