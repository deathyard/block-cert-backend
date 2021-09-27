const Certificates = artifacts.require("Certificates");
const User = artifacts.require("Users")

module.exports = function (deployer) {
  deployer.deploy(Certificates);
  // deployer.
}