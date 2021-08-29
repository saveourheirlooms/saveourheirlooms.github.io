import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import NftList from "./components/nftlist.component";
import CreateNft from "./components/createnft.component";
import Asset from "./components/asset.component";
import Home from "./components/home.component";

function App() {
    return (
        <Router>
            <Navbar />
            <div class="container-fluid">
                <Route path="/" exact component={Home} />
                <Route path="/assets" exact component={NftList} />
                <Route path="/create" exact component={CreateNft} />
                <Route path="/asset/:id" exact component={Asset} />
            </div>
        </Router>
    );
}

export default App;
