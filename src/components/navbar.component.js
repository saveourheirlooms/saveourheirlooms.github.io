import React, { Component } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import "../App.css";
import Contract from "../abis/contract.json";

export default class Navbar extends Component {
    async componentWillMount() {
        //await this.loadWeb3();
        //await this.loadBlockchainData();
    }

    constructor(props) {
        super(props);
        this.state = {
            account: "You should login with Metamask on Rinkeby Testnet.",
            contract: null,
        };
        this.loadWeb3 = this.loadWeb3.bind(this);
        this.loadBlockchainData = this.loadBlockchainData.bind(this);
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
            console.log("girdim1");
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            console.log("girdim2");
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
            window.location.reload();
        }
        this.loadBlockchainData();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light shadow">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/create"
                            >
                                <a
                                    className="nav-link active"
                                    style={{
                                        fontSize: "x-large",
                                        fontFamily: '"Roboto", sans-serif',
                                    }}
                                >
                                    Create
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/assets"
                            >
                                <a
                                    className="nav-link active"
                                    style={{
                                        fontSize: "x-large",
                                        fontFamily: '"Roboto", sans-serif',
                                    }}
                                >
                                    Assets
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mx-auto order-0">
                    <Link
                        style={{ textDecoration: "none" }}
                        to="/"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        <a
                            className="navbar-brand mx-auto"
                            style={{
                                fontFamily: '"Sansita Swashed", cursive',
                                fontSize: "xx-large",
                            }}
                        >
                            Heirloom{" "}
                            <span
                                style={{
                                    fontSize: "x-small",
                                }}
                                class="badge badge-primary"
                            >
                                beta
                            </span>
                        </a>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target=".dual-collapse2"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a
                                className="nav-link"
                                style={{
                                    fontSize: "medium",
                                    fontFamily: '"Roboto", sans-serif',
                                    marginTop: "5px",
                                }}
                            >
                                {this.state.account}
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link">
                                <button
                                    className="btn btn-light btn-sm"
                                    onClick={this.loadWeb3}
                                >
                                    <i class="far fa-user-circle fa-2x"></i>
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
