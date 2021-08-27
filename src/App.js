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
        <Route path={process.env.PUBLIC_URL + "/"} exact component={Home} />
        <Route path={process.env.PUBLIC_URL + "/assets"} exact component={NftList} />
        <Route path={process.env.PUBLIC_URL + "/create"} exact component={CreateNft} />
        <Route path={process.env.PUBLIC_URL + "/asset/:id"} exact component={Asset} />
      </div>
    </Router>
  );
}

export default App;
