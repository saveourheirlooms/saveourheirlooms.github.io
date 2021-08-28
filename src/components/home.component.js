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
                        <div class="row">
                            <div
                                class="slider clearfix"
                                style={{ marginTop: "100px" }}
                            >
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
                                    <br /> Support our cultural heritage.
                                </h2>
                                <br></br>
                                <Link to="/assets">
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-lg"
                                    >
                                        Explore NFTs
                                    </button>
                                </Link>
                                <div
                                    class="photo"
                                    style={{
                                        position: "absolute",
                                        right: "470px",
                                        marginTop: "-350px",
                                    }}
                                >
                                    <img
                                        width="400"
                                        src="https://raw.githubusercontent.com/saveourheirlooms/heirloom/master/src/bg.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <br />
                            <div
                                class="row"
                                style={{
                                    marginBottom: "-50px",
                                    marginTop: "100px",
                                    borderTop: "1px solid #ddd",
                                    width: "100%",
                                }}
                            >
                                {" "}
                            </div>
                        </div>
                        <div
                            class="slider clearfix"
                            style={{ marginTop: "100px" }}
                        >
                            <div class="photo" style={{ float: "left" }}>
                                <img
                                    width="400"
                                    src="https://raw.githubusercontent.com/paylasimlianalizraporsistemi/pars/main/webui/src/bc.png"
                                    alt=""
                                />
                            </div>
                            <div style={{ marginLeft: "150px", float: "left" }}>
                                <h1
                                    class="mb-sm-4 display-4 fw-light lh-sm fs-4 fs-lg-6 fs-xxl-7"
                                    style={{}}
                                >
                                    <span class="">Blockchain</span>

                                    <br />
                                </h1>
                                <h2
                                    class="font-weight-light mt-5"
                                    style={{ width: "520px", fontSize: "20px" }}
                                >
                                    Lorem Ipsum Dolore Sit Amet Lorem Ipsum
                                    Dolore Sit Amet Lorem Ipsum Dolore Sit Amet
                                    Lorem Ipsum Dolore Sit Amet Lorem Ipsum
                                    Dolore Sit Amet
                                    <br /> Lorem Ipsum Dolore Sit Amet Lorem
                                    Ipsum Dolore Sit Amet Lorem Ipsum Dolore Sit
                                    Amet Lorem Ipsum Dolore Sit Amet Lorem Ipsum
                                    Dolore Sit Amet
                                    <br />
                                    Lorem Ipsum Dolore Sit Amet Lorem Ipsum
                                    Dolore Sit Amet Lorem Ipsum Dolore Sit Amet
                                    Lorem Ipsum Dolore Sit Amet Lorem Ipsum
                                    Dolore Sit Amet
                                </h2>
                            </div>
                        </div>
                        <div
                            class="row"
                            style={{
                                marginTop: "50px",
                                marginBottom: "50px",
                                borderTop: "1px solid #ddd",
                                width: "100%",
                            }}
                        >
                            {" "}
                        </div>
                        <div class="row">
                            <div class="how-outer-div">
                                <h1 class="how-title">How it works?</h1>
                            </div>
                            <div class="row how-inner">
                                <div class="col how-div">
                                    <i class="fas fa-handshake"></i>
                                    <h3>Lorem Ipsum</h3>
                                    <span>
                                        Lorem Ipsum Dolore Sit Amet Lorem Ipsum
                                        Dolore Sit Amet Lorem Ipsum Dolore Sit
                                        Amet Lorem Ipsum Dolore Sit Amet Lorem
                                        Ipsum Dolore Sit Amet
                                    </span>
                                </div>
                                <div class="col how-div">
                                    <i class="fas fa-hand-holding-heart"></i>
                                    <h3>Lorem Ipsum</h3>
                                    <span>
                                        Lorem Ipsum Dolore Sit Amet Lorem Ipsum
                                        Dolore Sit Amet Lorem Ipsum Dolore Sit
                                        Amet Lorem Ipsum Dolore Sit Amet Lorem
                                        Ipsum Dolore Sit Amet
                                    </span>
                                </div>
                                <div class="col how-div">
                                    <i class="fas fa-chess-rook"></i>
                                    <h3>Lorem Ipsum</h3>
                                    <span>
                                        Lorem Ipsum Dolore Sit Amet Lorem Ipsum
                                        Dolore Sit AmetLorem Ipsum Dolore Sit
                                        Amet Lorem Ipsum Dolore Sit Amet
                                    </span>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div
                            class="row"
                            style={{
                                marginTop: "50px",
                                marginBottom: "50px",
                                borderTop: "1px solid #ddd",
                                width: "100%",
                            }}
                        >
                            {" "}
                        </div>
                        <div class="row">
                            <div class="how-outer2-div">
                                <i class="fas fa-code"></i>
                                <h1 class="how-title">
                                    The project is still in development.{" "}
                                    <br></br> Stay tuned.
                                </h1>
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
                        background: "#343a40",
                    }}
                >
                    <div class="">
                        {/* Grid container */}
                        <div className="container pb-2 pt-2">
                            {/* Section: Social media */}
                            <section className="mb-1">
                                {/* Twitter */}
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
