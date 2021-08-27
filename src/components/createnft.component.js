import { Link } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import SkeletonNft from "../skeletons/SkeletonNft";
import axios from "axios";
import { NFTStorage, File } from "nft.storage";
import Web3 from "web3";
import Contract from "../abis/contract.json";
const fs = require("fs");

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc2ZEE3OGFiMzUxMDM1Q2ViNDhhOTk3MkE3MkIyMzg1RmZEOGFGRmIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyOTgzMjgzNjM3NSwibmFtZSI6ImhlaXJsb29tIn0.ZuYum8nD_OQdfbCkyCtrVU0Bi0WZyD5Kwe4e9M05Kk4";
const client = new NFTStorage({ token: apiKey });

export default class NftList extends Component {
  async componentWillMount() {
    await this.loadBlockchainData();
    await this.loadWeb3();
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
      console.log(this.state.contract);
    } else {
      window.alert("Smart contract not deployed to detect network!");
    }
  }

  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeHash = this.onChangeHash.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeMetadata = this.onChangeMetadata.bind(this);
    this.onChangeContract = this.onChangeContract.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      desc: null,
      hash: null,
      image: null,
      price: null,
      category: null,
      metadata: null,
      contract_address: null,
      contract: null,
      account: "",
    };
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

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }
  onChangeDesc(e) {
    this.state.desc = e.target.value;
  }
  onChangeHash(e) {
    this.state.hash = e.target.value;
  }
  onChangePrice(e) {
    this.state.price = e.target.value;
  }
  onChangeCategory(e) {
    this.state.category = e.target.value;
  }
  onChangeMetadata(e) {
    this.state.metadata = e.target.value;
  }
  onChangeContract(e) {
    this.state.contract_address = e.target.value;
  }

  captureFile = (event) => {
    event.preventDefault();
    console.log("file captured.");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer.from(reader.result) });
    };
  };
  /*https://ipfs.io/ipfs/bafybeihhttvpdcjp243iiltqpfanhpztvqsxi7tiva7qchzmljgrxpgace/pinpie.jpg
   */
  async nftStorage(name, desc, category) {
    const metadata = await client.store({
      name: name,
      description: desc,
      category: category,
      image: new File([this.state.buffer], "pinpie.jpg", { type: "image/jpg" }),
    });
    const url = "https://ipfs.io/ipfs/" + metadata.url.substring(7);
    const image_url =
      "https://ipfs.io/ipfs/" + metadata.data.image.href.substring(7);
    this.setState({ image: image_url });
    return url;
    // ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
  }

  async onSubmit() {
    const name = this.state.name;
    const desc = this.state.desc;
    const category = this.state.category;
    const metadata = await this.nftStorage(name, desc, category);
    await this.state.contract.methods
      .mintItem(this.state.account, metadata, metadata)
      .send({ from: this.state.account }, (err, res) => {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        this.setState({ hash: res });
        console.log("Hash of the transaction: " + res);
      })
      .once("confirmation", (r) => {
        console.log(this.state.hash);
        console.log("success");

        this.loadToMongoDB();
      });
  }

  loadToMongoDB() {
    const nft = {
      name: this.state.name,
      desc: this.state.desc,
      hash: this.state.hash,
      image: this.state.image,
      price: this.state.price,
      category: this.state.category,
      metadata: this.state.metadata,
      contract: this.state.contract_address,
    };

    axios
      .post("https://167.99.133.71:5000/nfts/add", nft)
      .then((res) => console.log(res.data));
  }

  /*onSubmit(e){
        e.preventDefault();

        const nft = {
            name: this.state.name,
            desc: this.state.desc,
            hash: this.state.hash,
            image: this.state.image,
            price: this.state.price,
            category: this.state.category,
            metadata: this.state.metadata,
            contract: this.state.contract,
        }

        axios.post('http://localhost:5000/nfts/add',nft)
        .then(res => console.log(res.data));


    }*/

  componentDidMount() {}

  render() {
    return (
      <div class="container">
        <div class="mx-auto" style={{ width: "1080px" }}>
          <h1 class="mb-sm-4 display-4 fw-light lh-sm fs-4 fs-lg-6 fs-xxl-7">
            Create
          </h1>
          <div class="row">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.onSubmit();
              }}
            >
              <div class="form-group" style={{ width: "420px" }}>
                <label for="exampleInputName">NFT Name</label>
                <input
                  value={this.state.name}
                  onChange={this.onChangeName}
                  class="form-control input-fileName"
                />
                <small id="projectName" class="form-text text-muted">
                  General Name for your project
                </small>
              </div>
              <div class="form-group" style={{ width: "420px" }}>
                <label for="exampleInputName">NFT Desc</label>
                <input
                  value={this.state.desc}
                  onChange={this.onChangeDesc}
                  class="form-control input-fileName"
                />
                <small id="projectName" class="form-text text-muted">
                  General Name for your project
                </small>
              </div>
              <div class="form-group" style={{ width: "420px" }}>
                <label for="exampleInputName">NFT Hash</label>
                <input
                  value={this.state.hash}
                  onChange={this.onChangeHash}
                  class="form-control input-fileName"
                />
                <small id="projectName" class="form-text text-muted">
                  General Name for your project
                </small>
              </div>
              <div class="form-group" style={{ width: "420px" }}>
                <label for="exampleInputName">NFT Image</label>
                <input
                  type="file"
                  onChange={this.captureFile}
                  class="form-control input-fileName"
                />
                <small id="projectName" class="form-text text-muted">
                  General Name for your project
                </small>
              </div>
              <div class="form-group" style={{ width: "420px" }}>
                <label for="exampleInputName">NFT Price</label>
                <input
                  type="number"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                  class="form-control input-fileName"
                />
                <small id="projectName" class="form-text text-muted">
                  General Name for your project
                </small>
              </div>
              <div class="form-group" style={{ width: "420px" }}>
                <label for="exampleInputName">NFT Category</label>
                <input
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                  class="form-control input-fileName"
                />
                <small id="projectName" class="form-text text-muted">
                  General Name for your project
                </small>
              </div>
              <div class="form-group" style={{ width: "420px" }}>
                <label for="exampleInputName">NFT Metadata</label>
                <input
                  value={this.state.metadata}
                  onChange={this.onChangeMetadata}
                  class="form-control input-fileName"
                />
                <small id="projectName" class="form-text text-muted">
                  General Name for your project
                </small>
              </div>
              <div class="form-group" style={{ width: "420px" }}>
                <label for="exampleInputName">NFT Contract</label>
                <input
                  value={this.state.contract_address}
                  onChange={this.onChangeContract}
                  class="form-control input-fileName"
                />
                <small id="projectName" class="form-text text-muted">
                  General Name for your project
                </small>
              </div>

              <input
                type="submit"
                class="d-inline-block btn btn-primary"
                value="Mint"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
