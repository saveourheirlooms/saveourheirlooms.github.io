import { Link } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import SkeletonNft from "../skeletons/SkeletonNft";
import axios from "axios";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div class="container-fluid">
                <div class="container">
                    <div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 d-flex flex-column justify-content-center mb-5 mb-lg-0">
                                    <div>
                                        <h1 class="mb-sm-4 display-4 fw-light lh-sm fs-4 fs-lg-6 fs-xxl-7">
                                            <span class="">Save </span>
                                            <span class="">
                                                Our{" "}
                                                <span
                                                    class=""
                                                    style={{
                                                        fontFamily:
                                                            '"Sansita Swashed", cursive',
                                                    }}
                                                >
                                                    Heirlooms{" "}
                                                </span>{" "}
                                            </span>
                                            <br />
                                        </h1>
                                        <h2 class="font-weight-light mt-5">
                                            Discover the most meaningful NFTs.
                                            <br /> Support our cultural
                                            heritage.
                                        </h2>
                                        <br />
                                        <Link to="/assets">
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-dark"
                                            >
                                                Explore NFTs
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <img
                                        src="https://raw.githubusercontent.com/saveourheirlooms/heirloom/master/src/bg.png"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <hr class="my-4"></hr>
                        <br></br>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 mb-4 mb-xl-0">
                                    <img
                                        className="img-fluid float-xl-right"
                                        src="https://raw.githubusercontent.com/paylasimlianalizraporsistemi/pars/main/webui/src/bc.png"
                                        alt="Network Page Screenshot"
                                    />
                                </div>
                                <div className="col-xl-6 d-flex flex-column justify-content-center">
                                    <div>
                                        <h1
                                            class="mb-sm-4 display-4 fw-light lh-sm fs-4 fs-lg-6 fs-xxl-7"
                                            style={{}}
                                        >
                                            <span class="">
                                                Blockchain and IPFS
                                            </span>

                                            <br />
                                        </h1>
                                        <h2
                                            class="font-weight-light mt-5"
                                            style={{
                                                width: "520px",
                                                fontSize: "20px",
                                            }}
                                        >
                                            We used the transparency,
                                            reliability and speed features of
                                            decentralized and distributed
                                            technologies such as Blockchain and
                                            IPFS for social good with our
                                            Heirloom project.
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <hr class="my-4"></hr>
                        <br></br>
                        <div class="row">
                            <div class="how-outer-div">
                                <h1 class="how-title">How it works?</h1>
                            </div>
                            <div class="row how-inner">
                                <div class="col how-div">
                                    <i class="fas fa-handshake"></i>
                                    <h3>Creating</h3>
                                    <span>
                                        Compliance check of assets and
                                        protection agreement is made between the
                                        foundations and hosts. Assets and "how
                                        to use" are converted to NFTs.
                                    </span>
                                </div>
                                <div class="col how-div">
                                    <i class="fas fa-hand-holding-heart"></i>
                                    <h3>Listing</h3>
                                    <span>
                                        Transactions and NFTs are securely
                                        stored on blockchain and IPFS. NFTs are
                                        listed on the market. Supporters access
                                        the market and buy NFT.
                                    </span>
                                </div>
                                <div class="col how-div">
                                    <i class="fas fa-chess-rook"></i>
                                    <h3>Preserving</h3>
                                    <span>
                                        The income obtained after the purchase
                                        (sale of protection rights) is
                                        transferred to the foundations. Regular
                                        (monthly) payments are made to asset
                                        hosts or responsible institutions
                                        according to the terms set in the smart
                                        contracts.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <br />
                        <hr class="my-4"></hr>
                        <br></br>
                        <div class="row">
                            <div class="how-outer-div">
                                <h1 class="how-title">
                                    We are the MSKU Blockchain Research Group
                                </h1>
                            </div>
                            <div class="row how-inner">
                                <div class="col how-div">
                                    <img src="https://media.discordapp.net/attachments/784152625662132235/881239398191087636/450px-MSKU-BlockchainResearchGroup.jpg"></img>
                                    <h3>
                                        We study to explore the potential of
                                        blockchain technology and develop
                                        applications.
                                    </h3>
                                    <span>
                                        For detailed information about our
                                        publications and events:{" "}
                                        <a
                                            style={{
                                                color: "white",
                                                fontWeight: "bolder",
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="http://wiki.netseclab.mu.edu.tr/index.php?title=MSKU_Blockchain_Research_Group"
                                        >
                                            Our Webpage
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="row"></div>
                    </div>
                </div>

                <footer
                    className=" text-center text-dark "
                    style={{
                        width: "100%",
                        background: "#262e3d",
                    }}
                >
                    <div class="">
                        {/* Grid container */}
                        <div className="container pb-2 pt-2">
                            {/* Section: Social media */}
                            <section className="mb-1">
                                {/* Twitter */}
                                <a
                                    className="btn btn-light  m-1"
                                    style={{
                                        fontFamily:
                                            '"Sansita Swashed", cursive',
                                    }}
                                >
                                    Heirloom
                                </a>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a
                                    className="btn btn-outline-light btn-floating m-1"
                                    href="https://twitter.com/saveheirlooms"
                                    role="button"
                                >
                                    <i className="fab fa-twitter" />
                                </a>
                                {/* Github */}
                                <a
                                    className="btn btn-outline-light btn-floating m-1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://github.com/saveourheirlooms"
                                    role="button"
                                >
                                    <i className="fab fa-github" />
                                </a>
                                {/* Gmails */}
                                <a
                                    className="btn btn-outline-light btn-floating m-1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="mailto:saveourheirlooms@gmail.com"
                                    role="button"
                                >
                                    <i className="fab fa-google" />
                                </a>
                            </section>
                            {/* Section: Social media */}
                        </div>
                        {/* Grid container */}
                        {/* Copyright */}

                        {/* Copyright */}
                    </div>
                </footer>
            </div>
        );
    }
}
