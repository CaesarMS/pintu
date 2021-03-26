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

    modifier onlyValidUser(uint _indexUser){
        require(msg.sender == user[_indexUser]);
        _;
    }

    modifier minIncrement{
        require(increment > 10);
        _;
    }

    function App() public{
        increment = 0;
    }

    function isUser() public view returns(bool isIndeed){
        if(user.length == 0) return false;
        return (user[addressToUser[msg.sender].index] == msg.sender);
    }

    function createUser(bytes32 _name) public returns(bool success){
        require(!isUser());

        addressToUser[msg.sender].name = _name;
        addressToUser[msg.sender].deposit = 0;
        addressToUser[msg.sender].index = user.push(msg.sender)-1;

        return true;
    }

    function addIncrement() public returns(bool success){
        require(isUser());

        increment += 1;

        return true;
    }

    function resetIncrement() public returns(bool success){
        require(isUser());

        increment = 0;

        return true;
    }

    function addDeposit(uint _amount) public payable minIncrement returns(bool success){
        require(isUser());
        require(msg.value >= 100000000000000000);

        balance += msg.value;
        addressToUser[msg.sender].deposit += _amount;
        
        return true;
    }

    function withdraw(uint _indexUser, uint _amount) public onlyValidUser(_indexUser) returns(bool success){
        require(isUser());
        require(addressToUser[msg.sender].deposit >= _amount);

        msg.sender.transfer(_amount);

        balance -= _amount;
        addressToUser[msg.sender].deposit -= _amount;

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