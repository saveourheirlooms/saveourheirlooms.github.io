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
    axios.get("https://167.99.133.71:5000/nfts/" + id).then((response) => {
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
      <div class="container">
        <div class="mx-auto" style={{ width: "1080px" }}>
          <div class="row mt-2">
            <div class="nft-image col-4">
              <img src={this.state.image} class="inner-nft-image"></img>
            </div>
            <div class="col">
              <div class="row">
                <div class="nft-title col">
                  <div class="inner-nft-title">{this.state.name}</div>
                  <div class="inner-nft-owner">John Smith Collection</div>
                  <div class="inner-nft-address">{this.state.hash}</div>
                </div>
              </div>
              <div class="row">
                <div class="nft-price col">
                  <div class="row">
                    <div class="inner-nft-price">${this.state.price}</div>

                    <div class="buttons">
                      <button
                        type="button"
                        class="btn btn-primary inner-nft-buy"
                      >
                        Buy Now
                      </button>
                      <button type="button" class="btn btn-info inner-nft-bid">
                        Bid Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="nft-desc col">
                  <div class="inner-nft-details mb-2">Details</div>
                  <div class="inner-nft-contract">Owner:</div>
                  <div class="inner-nft-contract">
                    Transaction Hash: {this.state.hash}
                  </div>
                  <div class="inner-nft-contract">
                    Contract Address: {this.state.contract}
                  </div>
                  <div class="inner-nft-metadata">
                    Metadata: {this.state.metadata}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="other-coll row">
            <div class="col">
              <div class="inner-nft-other mb-2">John Smith Collection</div>
              <div class="row mt-4">
                <SkeletonNft />
                <SkeletonNft />
                <SkeletonNft />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
