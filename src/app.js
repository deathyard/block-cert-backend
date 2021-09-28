const App = {
  enableEthereumButton: null,
  web3Provider: null,
  contracts: {},
  accounts: ['0x0'],
  
  initWeb3: async function () {
    console.log('initWeb3');
    const provider = await detectEthereumProvider();
    if (provider) {
      // From now on, this should always be true:
      App.initContract(provider); // initialize your app
    } else {
      console.log('Please install MetaMask!');
    }
  },

  initContract: async function (provider) {
    console.log('initContract', provider);
    const certificate = await $.getJSON("HashStorage.json");

    // Instantiate a new truffle contract from the artifact
    App.contracts.Certificate = TruffleContract(certificate);

    // Connect provider to interact with contract
    await App.contracts.Certificate.setProvider(provider);

    // App.listenForEvents();
    return App.render();

  },
  render : function() {
    $("#user").text(ethereum.selectedAddress)
    App.contracts.Certificate.deployed().then(async function(e){
      // change the ui here
    })
  }
}

// META-MASK DEFAULT WEB3 CONFIG

window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          // Request account access if needed
          await ethereum.enable();
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */});
      } catch (error) {
          // User denied account access...
      }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */});
  }
  // Non-dapp browsers...
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
});

// CONFIG ENDS

$(window).load(function () {
  App.ethereumButton = document.getElementById('enableEthereumButton');
  App.ethereumButton.addEventListener('click', async function () {
    //Will Start the metamask extension
    App.accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    ethereum.on('accountsChanged', function (accounts) {
      App.render();
    });
    App.initWeb3();
  });
  App.ethereumButton.toggleAttribute('disabled', false);
});