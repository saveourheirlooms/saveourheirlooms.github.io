import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import NftList from "./components/nftlist.component";
import CreateNft from "./components/createnft.component";
import Asset from "./components/asset.component";
import Home from "./components/home.component";
function App() {
  return (
    <Router>
      <Navbar />
      <div class="container">
        <Route path={"https://saveourheirlooms.github.io" + "/"} exact component={Home} />
        <Route path={"https://saveourheirlooms.github.io" + "/assets"} exact component={NftList} />
        <Route path={"https://saveourheirlooms.github.io" + "/create"} exact component={CreateNft} />
        <Route path={"https://saveourheirlooms.github.io" + "/asset/:id"} exact component={Asset} />
      </div>
    </Router>
  );
}

export default App;
