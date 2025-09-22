import React, { memo } from "react";
import { HomeWrapper } from "./style";

const Home = memo(() => {
  return (
    <HomeWrapper>
      <div className="home">
        <h2>home page</h2>
      </div>
    </HomeWrapper>
  );
});

export default Home;
