import React, { Component } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import "../App.css";
import Contract from "../abis/contract.json";

export default class Navbar extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
    };
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const address = "0x6B08fB9FBF160acD475FF23D4E2950546290f56e";
    if (address) {
      const abi = Contract;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
    } else {
      window.alert("Smart contract not deployed to detect network!");
    }
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  render() {
    return (
      <div class="navigation-bar w-100 shadow-sm" style={{ fontSize: "20px" }}>
        <div class="text-center warning bg-light" style={{ fontSize: "13px" }}>
          {!this.state.account && "asdasd"}
          {this.state.account && this.state.account}
        </div>
        <div class="mx-auto" style={{ width: "1080px" }}>
          <nav class="navbar navbar-expand-lg navbar-light">
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <a
                class="navbar-brand"
                href="#"
                style={{
                  fontFamily: '"Sansita Swashed", cursive',
                  fontSize: "xx-large",
                }}
              >
                Heirloom
              </a>
              <span class="badge badge-primary">beta</span>
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <form
              class="form-inline my-2 my-lg-0 "
              style={{ marginLeft: "40px" }}
            >
              <input
                class="form-control"
                style={{ width: "500px" }}
                type="search"
              ></input>
              <button
                class="btn btn-outline-white btn-md my-2 my-sm-0"
                type="submit"
              >
                <i class="fas fa-search" style={{ marginLeft: "-70px" }}></i>
              </button>
            </form>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="nav navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <Link style={{ textDecoration: "none" }} to="/create">
                    <a class="nav-link" href="#">
                      Create
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link style={{ textDecoration: "none" }} to="/assets">
                    <a class="nav-link" href="#">
                      Assets
                    </a>
                  </Link>
                </li>
                <li class="nav-item active">
                  <div class="dropdown">
                    <a class="nav-link dropbtn" href="#">
                      <i
                        class="fas fa-user dropbtn"
                        style={{ color: "#765F84" }}
                      ></i>
                    </a>
                    <div class="dropdown-content">
                      <a href="#">My Profile</a>
                      <a href="#">My Assets</a>
                      <a href="#">My Collections</a>
                      <a href="#">Settings</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
