pragma solidity ^0.4.21;

contract App{
    struct AppStruct{
        bytes32 name;
        uint deposit;
        uint index;
    }
    address[] private user;
    uint increment;
    uint balance;

    mapping(address => AppStruct) private addressToUser;

    modifier onlyValidUser(address _userAddress, uint _indexUser){
        require(_userAddress == user[_indexUser]);
        _;
    }

    modifier minIncrement{
        require(increment > 10);
        _;
    }

    function App() public{
        increment = 0;
    }

    function isUser(address _userAddress) public view returns(bool isIndeed){
        if(user.length == 0) return false;
        return (user[addressToUser[_userAddress].index] == _userAddress);
    }

    function createUser(address _userAddress, bytes32 _name) public returns(bool success){
        require(!isUser(_userAddress));

        addressToUser[_userAddress].name = _name;
        addressToUser[_userAddress].deposit = 0;
        addressToUser[_userAddress].index = user.push(_userAddress)-1;

        return true;
    }

    function addIncrement(address _userAddress) public returns(bool success){
        require(isUser(_userAddress));

        increment += 1;

        return true;
    }

    function resetIncrement(address _userAddress) public returns(bool success){
        require(isUser(_userAddress));

        increment = 0;

        return true;
    }

    function addDeposit(address _userAddress, uint _amount) public payable returns(bool success){
        require(isUser(_userAddress));
        require(msg.value >= 100000000000000000);

        balance += msg.value;
        addressToUser[_userAddress].deposit += _amount;
        
        return true;
    }

    function withdraw(address _userAddress, uint _indexUser, uint _amount) public minIncrement onlyValidUser(_userAddress, _indexUser) returns(bool success){
        require(isUser(_userAddress));
        require(addressToUser[_userAddress].deposit >= _amount);

        _userAddress.transfer(_amount);

        balance -= _amount;
        addressToUser[_userAddress].deposit -= _amount;

        return true;
    }

    function getBalance() public view returns(uint bal){
        return balance;
    }

    function getIncrement() public view returns(uint inc){
        return increment;
    }

    function getUserCount() public view returns(uint count){
        return user.length;
    }

    function getAddressByIndex(uint _index) public view returns(address userAddress){
        return user[_index];
    }

    function getNameByIndex(uint _index) public view returns(bytes32 name){
        return addressToUser[getAddressByIndex(_index)].name;
    }

    function getDepositByIndex(uint _index) public view returns(uint deposit){
        return addressToUser[getAddressByIndex(_index)].deposit;
    }

    function getIndexByAddress(address _user) public view returns(uint index){
        return addressToUser[_user].index;
    }

}