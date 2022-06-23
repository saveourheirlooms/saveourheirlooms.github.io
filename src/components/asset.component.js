import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Web3 from 'web3';
import Contract from '../abis/contract.json';
export default class Asset extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  constructor(props) {
    super(props);

    this.loadWeb3 = this.loadWeb3.bind(this);
    this.loadBlockchainData = this.loadBlockchainData.bind(this);

    this.state = {
      name: '',
      desc: null,
      hash: null,
      image: null,
      price: null,
      category: null,
      metadata: null,
      contract_address: null,
      contract: null,
      account: '',
      isDisabled: false,
      loadingDisplay: 'none',
      owner: '',
      tokenId: '',
    };
  }

  async componentDidMount() {
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
        const owner = response.data[0].owner;
        const tokenId = response.data[0].tokenId;
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
        this.setState({ owner });
        this.setState({ tokenId });
      }
    });
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const address = '0x6aE315F9F9d2675F63A45812C8f33ADE6CAff50F';
    if (address) {
      const abi = Contract;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
      console.log(this.state.contract);
    } else {
      window.alert('Smart contract not deployed to detect network!');
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
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
      window.location.reload();
    }
    this.loadBlockchainData();
  }

  loadToMongoDB() {}

  async buyToken() {
    const web3 = window.web3;
    const address = '0x6aE315F9F9d2675F63A45812C8f33ADE6CAff50F';
    const abi = Contract;
    const contract1 = new web3.eth.Contract(abi, address);
    let buyToken = await contract1.methods
      .buyToken(2)
      .send(
        { from: '0x435d513009A0736EC80e8d947c20B970B6a31702' },
        (err, res) => {
          if (err) {
            console.log('An error occured', err);
            return;
          }
          //this.setState({ hash: res });
          console.log('Hash of the transaction: ' + res);
        }
      )
      .once('confirmation', (r) => {
        //console.log(this.state.hash);
        console.log('success');
      });
    //this.setState({ tokenId: buyToken.events.Transfer.returnValues[2] });
    //this.setState({ owner: buyToken.events.Transfer.returnValues[1] });
    const nft = {
      name: 'token2',
      desc: 'token2',
      hash: '0x008c9fbaa739aeaaf72c44bd29255dd18c531eefcdda6ca0af9508b266555146',
      image:
        'https://ipfs.io/ipfs/bafybeiezcq6htisubowx2izrdsr233bemyjoqkmgcg3aoaklipcvbuchm4/nft.jpg',
      price: 100,
      category: 'token2',
      metadata:
        'https://ipfs.io/ipfs/bafybeiezcq6htisubowx2izrdsr233bemyjoqkmgcg3aoaklipcvbuchm4/nft.jpg',
      contract: 'token2',
      owner: '0x435d513009A0736EC80e8d947c20B970B6a31702',
      tokenId: 2,
    };

    axios
      .post(process.env.REACT_APP_BACKEND_URL_UPDATE + '2', nft)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="container-fluid">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div class="mx-auto" style={{ width: '1280px' }}>
            <div class="row mt-2">
              <div class="nft-image col-4">
                <img
                  src={this.state.image}
                  class="inner-nft-image"
                  alt="LOADING..."
                ></img>
              </div>
              <div class="col">
                <div class="row">
                  <div class="nft-title col">
                    <div class="inner-nft-title">{this.state.name}</div>
                    <div class="inner-nft-owner">
                      Token ID {this.state.tokenId}
                    </div>
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
                          onClick={this.buyToken}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="nft-desc col">
                    <div class="inner-nft-details mb-2">Details</div>
                    <div class="inner-nft-contract">
                      Owner: {this.state.owner}
                    </div>
                    <div class="inner-nft-contract">
                      Transaction Hash: {this.state.hash}
                    </div>
                    <div class="inner-nft-contract">
                      Description: {this.state.desc}
                    </div>
                    <div class="inner-nft-metadata">
                      Metadata: {this.state.image}
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
            width: '100%',
            background: '#262e3d',
          }}
        >
          <div class="">
            {/* Grid container */}
            <div className="container pb-2 pt-2">
              {/* Section: Social media */}
              <section className="mb-1">
                {/* Twitter */}
                <button
                  className="btn btn-light m-1"
                  style={{
                    fontFamily: '"Sansita Swashed", cursive',
                  }}
                >
                  Heirloom
                </button>
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
