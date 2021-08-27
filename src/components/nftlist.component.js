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
      axios.get("https://heirloom-backend-hwggz.ondigitalocean.app/nfts/").then((response) => {
        if (response.data.length > 0) {
          const nfts = response.data;
          this.setState({ nfts });
        }
      });
    }, 2000);
  }

  render() {
    return (
      <div class="container">
        <div class="mx-auto" style={{ width: "1080px" }}>
          <div class="row">
            <div class="row" style={{ marginTop: "100px" }}>
              {this.state.nfts &&
                this.state.nfts.map((nft) => (
                  <div className="col">
                    <a
                      href={"/asset/" + nft.hash}
                      class=""
                      style={{ textDecoration: "none", color: "#353840" }}
                    >
                      <div
                        className="card nft-card"
                        style={{ width: "15rem", marginBottom: "25px" }}
                      >
                        <img
                          className="card-img-top"
                          height={250}
                          width={250}
                          src={nft.image}
                          alt="Card image cap"
                        />
                        <span
                          style={{
                            display: "flex",
                            position: "absolute",
                            top: "5px",
                            right: "10px",
                            color: "#765F84",
                            fontSize: "15px",
                          }}
                        >
                          <a href="" style={{ color: "white" }}>
                            <i
                              class="far fa-heart nft-like"
                              style={{ fontSize: "15px", marginRight: "5px" }}
                            ></i>
                          </a>
                          0
                        </span>
                        <div className="card-body">
                          <h5 className="card-title">{nft.name}</h5>
                          <p
                            className="card-text"
                            style={{ marginTop: "-10px" }}
                          >
                            {nft.desc}
                          </p>
                          <div
                            className="float-right"
                            style={{ marginTop: "-42px", fontSize: "20px" }}
                          >
                            ${nft.price}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}

              {!this.state.nfts &&
                [1, 2, 3, 4].map((n) => <SkeletonNft key={n} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
