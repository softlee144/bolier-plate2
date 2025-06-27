import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/hello`)
      .then((response) => console.log(response.data));
  }, []);
  return <div>LandingPage</div>;
}

export default LandingPage;
