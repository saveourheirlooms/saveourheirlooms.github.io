import { Link } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import SkeletonNft from "../skeletons/SkeletonNft";

export default class Asset extends Component {
    constructor(props) {
        super(props);
        this.state = { id: null, nfts: null, name: null };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.setState({ id });
        axios.get(process.env.REACT_APP_BACKEND_URL + id).then((response) => {
            if (response.data.length > 0) {
                const nfts = response.data;
                const name = response.data[0].name;
                const desc = response.data[0].desc;
                const hash = response.data[0].hash;
                const image = response.data[0].image;
                const price = response.data[0].price;
                const category = response.data[0].category;
                const metadata = response.data[0].metadata;
                const contract = response.data[0].contract;
                console.log(nfts);
                this.setState({ nfts });
                this.setState({ name });
                this.setState({ desc });
                this.setState({ hash });
                this.setState({ image });
                this.setState({ price });
                this.setState({ category });
                this.setState({ metadata });
                this.setState({ contract });
            }
        });
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="container-fluid">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div class="mx-auto" style={{ width: "1280px" }}>
                        <div class="row mt-2">
                            <div class="nft-image col-4">
                                <img
                                    src={this.state.image}
                                    class="inner-nft-image"
                                ></img>
                            </div>
                            <div class="col">
                                <div class="row">
                                    <div class="nft-title col">
                                        <div class="inner-nft-title">
                                            {this.state.name}
                                        </div>
                                        <div class="inner-nft-owner">
                                            Collection
                                        </div>
                                        <div class="inner-nft-address">
                                            {this.state.hash}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="nft-price col">
                                        <div class="row">
                                            <div class="inner-nft-price">
                                                ${this.state.price}
                                            </div>

                                            <div class="buttons">
                                                <button
                                                    type="button"
                                                    class="btn btn-primary inner-nft-buy"
                                                >
                                                    Buy Now
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-info inner-nft-bid"
                                                >
                                                    Bid Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="nft-desc col">
                                        <div class="inner-nft-details mb-2">
                                            Details
                                        </div>
                                        <div class="inner-nft-contract">
                                            Owner:
                                        </div>
                                        <div class="inner-nft-contract">
                                            Transaction Hash: {this.state.hash}
                                        </div>
                                        <div class="inner-nft-contract">
                                            Contract Address:{" "}
                                            {this.state.contract}
                                        </div>
                                        <div class="inner-nft-metadata">
                                            Metadata: {this.state.metadata}
                                        </div>
                                    </div>
                                </div>
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
