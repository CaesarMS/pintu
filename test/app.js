const App = artifacts.require("App");

const chai = require('chai');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

contract('App', function(accounts){
    var person = accounts[0];
	var instance;

    before('Deploy Contracts', async () => {
		return App.new().then((_app) => {
			return instance = _app;
		});
	});

    it("Should create a new user", () => {
		let name = web3.fromAscii("Arta");

		return instance.createUser(person, name, { gas: 200000, gasPrice: 1000000000, from: person }).then(function (res) {
			return chai.assert.isOk(res);
		});
	});

    it("Should add increment", () => {
		return instance.addIncrement(person, { gas: 200000, gasPrice: 1000000000, from: person }).then(function (res) {
			return chai.assert.isOk(res);
		});
	});

    it("Should reset increment", () => {
		return instance.resetIncrement(person, { gas: 200000, gasPrice: 1000000000, from: person }).then(function (res) {
			return chai.assert.isOk(res);
		});
	});

    it("Should success deposit 0.1 ETH", () => {
        let amount = web3.toWei(0.1, 'ether');

        return instance.addDeposit(person, amount, {value: amount, gas: 200000, gasPrice: 1000000000, from: person}).then(function(res){
            return chai.assert.isOk(res);
        });
	});

    it("Should failed deposit 0.05 ETH", () => {
        let amount = web3.toWei(0.05, 'ether');

        return instance.addDeposit(person, amount, {value: amount, gas: 200000, gasPrice: 1000000000, from: person}).then(function(res){
            return chai.assert.fail(res);
        }).catch(function(error){
			return chai.assert.isOk(error);
		});  
	});

    it("Should failed withdraw 0.05 ETH when counter under 10", () => {
        let amount = web3.toWei(0.05, 'ether');

        return instance.withdraw(person, 0, amount, {gas: 200000, gasPrice: 1000000000, from: person}).then(function(res){
            return chai.assert.fail(res);
        }).catch(function(error){
			return chai.assert.isOk(error);
		});  
	});

    it("Should add 11 to counter", () => {
        let counter = 11;

        for(let i=0; i<counter; i++){
            instance.addIncrement(person, {gas: 200000, gasPrice: 1000000000, from: person}).then(function(ress){
                if(ress){
                    chai.assert.isOk(ress);
                }
            });
        }      
	});

    it("Should success withdraw 0.05 ETH when counter above 10", () => {
        let amount = web3.toWei(0.05, 'ether');

        return instance.withdraw(person, 0, amount, {gas: 200000, gasPrice: 1000000000, from: person}).then(function(res){
            return chai.assert.isOk(res);
        });  
	});
});