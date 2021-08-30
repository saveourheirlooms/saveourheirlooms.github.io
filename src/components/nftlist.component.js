import { Link } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import SkeletonNft from "../skeletons/SkeletonNft";
import axios from "axios";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default class NftList extends Component {
    constructor(props) {
        super(props);
        this.state = { nfts: null };
    }

    componentDidMount() {
        setTimeout(async () => {
            axios.get(process.env.REACT_APP_BACKEND_URL).then((response) => {
                if (response.data.length > 0) {
                    const nfts = response.data;
                    this.setState({ nfts });
                }
            });
        }, 2000);
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="container">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="alert alert-info" role="alert">
                        This is for testing purposes.
                    </div>
                    <div class="mx-auto" style={{ width: "1080px" }}>
                        <div class="row">
                            <div class="row" style={{ marginTop: "100px" }}>
                                {this.state.nfts &&
                                    this.state.nfts.map((nft) => (
                                        <div className="col">
                                            <a
                                                href={"#/asset/" + nft.hash}
                                                class=""
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#353840",
                                                }}
                                            >
                                                <div
                                                    className="card nft-card"
                                                    style={{
                                                        width: "15rem",
                                                        marginBottom: "25px",
                                                    }}
                                                >
                                                    <img
                                                        className="card-img-top"
                                                        height={250}
                                                        width={250}
                                                        src={nft.image}
                                                    />
                                                    <span
                                                        style={{
                                                            display: "flex",
                                                            position:
                                                                "absolute",
                                                            top: "5px",
                                                            right: "10px",
                                                            color: "#765F84",
                                                            fontSize: "15px",
                                                        }}
                                                    >
                                                        <a
                                                            href=""
                                                            style={{
                                                                color: "white",
                                                            }}
                                                        >
                                                            <i
                                                                class="far fa-heart nft-like"
                                                                style={{
                                                                    fontSize:
                                                                        "15px",
                                                                    marginRight:
                                                                        "5px",
                                                                }}
                                                            ></i>
                                                        </a>
                                                        0
                                                    </span>
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            {nft.name}
                                                        </h5>
                                                        <p
                                                            className="card-text"
                                                            style={{
                                                                marginTop:
                                                                    "-10px",
                                                            }}
                                                        >
                                                            {nft.desc}
                                                        </p>
                                                        <div
                                                            className="float-right"
                                                            style={{
                                                                marginTop:
                                                                    "-42px",
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        >
                                                            ${nft.price}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}

                                {!this.state.nfts &&
                                    [1, 2, 3, 4].map((n) => (
                                        <SkeletonNft key={n} />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                <footer
                    className=" text-center text-dark fixed-bottom"
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
