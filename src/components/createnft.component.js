import React, { Component } from 'react';
import axios from 'axios';
import { NFTStorage, File } from 'nft.storage';
import Web3 from 'web3';
import Contract from '../abis/contract.json';

const client = new NFTStorage({
  token: process.env.REACT_APP_NFTSTORAGE_APIKEY,
});

export default class NftList extends Component {
  async componentWillMount() {
    //await this.loadBlockchainData();
    //await this.loadWeb3();
    this.setState({ isDisabled: false });
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

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }
  onChangeDesc(e) {
    this.setState({ desc: e.target.value });
  }
  onChangeHash(e) {
    this.setState({ hash: e.target.value });
  }
  onChangePrice(e) {
    this.setState({ price: e.target.value });
  }
  onChangeCategory(e) {
    this.setState({ category: e.target.value });
  }
  onChangeMetadata(e) {
    this.setState({ metadata: e.target.value });
  }
  onChangeContract(e) {
    this.setState({ contract_address: e.target.value });
  }

  captureFile = (event) => {
    event.preventDefault();
    console.log('file captured.');
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
      image: new File([this.state.buffer], 'nft.jpg', {
        type: 'image/jpg',
      }),
    });
    const url = 'https://ipfs.io/ipfs/' + metadata.url.substring(7);
    const image_url =
      'https://ipfs.io/ipfs/' + metadata.data.image.href.substring(7);
    this.setState({ image: image_url });
    return url;
    // ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
  }

  async onSubmit() {
    this.setState({ isDisabled: true });
    this.setState({ loadingDisplay: 'inline' });
    await this.loadWeb3();
    const name = this.state.name;
    const desc = this.state.desc;
    const category = this.state.category;
    const metadata = await this.nftStorage(name, desc, category);
    let nftId = await this.state.contract.methods
      .mintItem(this.state.account, metadata, metadata)
      .send({ from: this.state.account }, (err, res) => {
        if (err) {
          this.setState({ isDisabled: false });
          this.setState({ loadingDisplay: 'none' });
          console.log('An error occured', err);
          return;
        }
        this.setState({ hash: res });
        console.log('Hash of the transaction: ' + res);
      })
      .once('confirmation', (r) => {
        console.log(this.state.hash);
        console.log('success');
      });
    this.setState({ tokenId: nftId.events.Transfer.returnValues[2] });
    this.setState({ owner: nftId.events.Transfer.returnValues[1] });
    this.loadToMongoDB();

    console.log(nftId);
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
      owner: this.state.owner,
      tokenId: this.state.tokenId,
    };

    axios
      .post(process.env.REACT_APP_BACKEND_URL_ADD, nft)
      .then((res) => console.log(res.data));
    this.setState({ isDisabled: false });
    this.setState({ loadingDisplay: 'none' });
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
      <div class="container-fluid">
        <div class="container">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="alert alert-info" role="alert">
            This is for testing purposes.
          </div>
          <div class="mx-auto" style={{ width: '1080px' }}>
            <h1 class="mb-sm-4 display-4 fw-light lh-sm fs-4 fs-lg-6 fs-xxl-7">
              Create an NFT
            </h1>
            <div class="row">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.onSubmit();
                }}
              >
                <div class="form-group" style={{ width: '420px' }}>
                  <label for="exampleInputName">NFT Name</label>
                  <input
                    value={this.state.name}
                    onChange={this.onChangeName}
                    class="form-control input-fileName"
                    required
                  />
                  <small id="projectName" class="form-text text-muted">
                    General Name for your NFT
                  </small>
                </div>
                <div class="form-group" style={{ width: '420px' }}>
                  <label for="exampleInputName">NFT Desc</label>
                  <input
                    value={this.state.desc}
                    onChange={this.onChangeDesc}
                    class="form-control input-fileName"
                    required
                  />
                  <small id="projectName" class="form-text text-muted">
                    Description of your NFT
                  </small>
                </div>
                <div class="form-group" style={{ width: '420px' }}>
                  <label for="exampleInputName">NFT Image</label>
                  <input
                    type="file"
                    onChange={this.captureFile}
                    class="form-control input-fileName"
                    required
                  />
                  <small id="projectName" class="form-text text-muted">
                    Image
                  </small>
                </div>
                <div class="form-group" style={{ width: '420px' }}>
                  <label for="exampleInputName">NFT Price</label>
                  <input
                    type="number"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    class="form-control input-fileName"
                    required
                  />
                  <small id="projectName" class="form-text text-muted">
                    Price of your NFT
                  </small>
                </div>
                <div class="form-group" style={{ width: '420px' }}>
                  <label for="exampleInputName">NFT Category</label>
                  <input
                    value={this.state.category}
                    onChange={this.onChangeCategory}
                    class="form-control input-fileName"
                    required
                  />
                  <small id="projectName" class="form-text text-muted">
                    Category of your NFT
                  </small>
                </div>
                <div class="form-group" style={{ width: '420px' }}>
                  <label for="exampleInputName">NFT Metadata</label>
                  <input
                    value={this.state.metadata}
                    onChange={this.onChangeMetadata}
                    class="form-control input-fileName"
                    required
                  />
                  <small id="projectName" class="form-text text-muted">
                    Metadata your NFT
                  </small>
                </div>
                <div class="form-group" style={{ width: '420px' }}>
                  <label for="exampleInputName">NFT Contract</label>
                  <input
                    value={this.state.contract_address}
                    onChange={this.onChangeContract}
                    class="form-control input-fileName"
                    required
                  />
                  <small id="projectName" class="form-text text-muted">
                    Contract address of your NFT
                  </small>
                </div>
                <input
                  type="submit"
                  class="d-inline-block btn btn-primary"
                  value="Mint"
                  disabled={this.state.isDisabled}
                />
                &nbsp;
                <button
                  name="loading"
                  class="btn btn-primary"
                  type="button"
                  style={{
                    display: this.state.loadingDisplay,
                  }}
                  disabled
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Minting...</span>
                </button>
              </form>
            </div>
          </div>
          <br></br>
          <br></br>
        </div>
        <footer
          className=" text-center text-dark "
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
                  className="btn btn-light  m-1"
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
