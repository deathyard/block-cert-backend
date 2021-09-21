pragma solidity >=0.4.21 <0.7.0;

import "./Owner.sol";

contract HashStorage is Owner{
    mapping (string => CertificateInfo) public certificates;
    struct CertificateInfo {
        string ipfsHash;
        string fileName;
        string fileType;
        bool latest;
        address owner;
    }

    event HashAdded(string ipfsHash, string fileHash);

    constructor () public {
        owner = msg.sender;
    }

    function add(string memory _ipfsHash, string memory _fileHash, string memory _fileName, string memory _fileType) public onlyOwner {
        require(certificates[_fileHash].latest == false, "[E1] This hash already latests in contract.");
        CertificateInfo memory certificateInfo = CertificateInfo(_ipfsHash, _fileName, _fileType, true, msg.sender);
        certificates[_fileHash] = certificateInfo;
        
        emit HashAdded(_ipfsHash, _fileHash);
    }

    function update(string memory _fileHash, string memory _newIpfsHash) public {
      require(certificates[_fileHash].latest == true, "File does not exists, add the file");
      require(certificates[_fileHash].owner == msg.sender);
      certificates[_fileHash].ipfsHash = _newIpfsHash;

      emit HashAdded(_newIpfsHash, _fileHash);
    }

    function get(string memory _fileHash) public view returns (string memory, string memory, string memory, string memory, bool, address) {
        return (
            _fileHash,
            certificates[_fileHash].ipfsHash,
            certificates[_fileHash].fileName,
            certificates[_fileHash].fileType,
            certificates[_fileHash].latest,
            certificates[_fileHash].owner
        );
    }
}