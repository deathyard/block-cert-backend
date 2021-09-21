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