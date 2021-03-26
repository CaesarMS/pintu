import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/index.css';

import Fortmatic from 'fortmatic';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import app_artifacts from '../../build/contracts/App.json';

const customNodeOptions = {
    rpcUrl: 'http://127.0.0.1:7545', // your own node url
    chainId: 5777 // chainId of your own node
};

const fm = new Fortmatic('pk_test_7CC4753C49C0758E', customNodeOptions);

var AppContract = contract(app_artifacts);

var account;
var indexAccount;
var instance;

const App = {
  deposit: function(amount){
    return instance.addDeposit(account, amount, {value: amount, gas: 200000, gasPrice: 1000000000, from: account}).then(function(success){
      if(success){
        location.reload();
      }else{
        alert('Deposit failed');
      }
    }).catch(function(e) {
      // There was an error! Handle it.
      console.log('error = ', e);
    });
  },
  withdraw: function(amount){
    return instance.withdraw(account, indexAccount, amount, {gas: 200000, gasPrice: 1000000000, from: account}).then(function(success){
      if(success){
        location.reload();
      }else{
        alert('Withdraw failed');
      }
    }).catch(function(e) {
      // There was an error! Handle it.
      console.log('error = ', e);
    });
  },
  add: function(){
    return instance.addIncrement(account, {gas: 200000, gasPrice: 1000000000, from: account}).then(function(success){
      if(success){
        location.reload();
      }else{
        alert('Add failed');
      }
    }).catch(function(e) {
      // There was an error! Handle it.
      console.log('error = ', e);
    });
  },
  reset: function(){
    return instance.resetIncrement(account, {gas: 200000, gasPrice: 1000000000, from: account}).then(function(success){
      if(success){
        location.reload();
      }else{
        alert('Reset failed');
      }
    }).catch(function(e) {
      // There was an error! Handle it.
      console.log('error = ', e);
    });
  },
  start: function(){
    var self = this;
    var counter;

    instance.getNameByIndex.call(indexAccount).then(function(_name){
      $('#username').text(web3.toUtf8(_name));
    });

    instance.getDepositByIndex.call(indexAccount).then(function(_depo){
      $('#bal').text(web3.fromWei(web3.toDecimal(_depo), 'ether'));
    }).catch(function(e) {
      // There was an error! Handle it.
      console.log('error = ', e);
    });

    $("#depositb").click(function(){
      let amount = $("input[name=depositAmount]").val();

      if(amount < 0.1){
        $('#depositAlert').css('display','block');
      }else{
        console.log('amount = ', web3.toWei(amount, 'ether'));

        self.deposit(web3.toWei(amount, 'ether'));
      }

      return false;
    });
    
    instance.getIncrement.call().then(function(_inc){
      $('#counter').text(counter  = _inc.toNumber());
    }).then(() => {
      if(counter <= 10){
        $("#withdrawm").css('display','none');
      }else{
        $("#withdrawb").click(function(){
          let amount = web3.toWei($("input[name=withdrawAmount]").val(), 'ether');

          self.withdraw(amount);

          return false;
        });
      }
    }).catch(function(e) {
      // There was an error! Handle it.
      console.log('error = ', e);
    });

    $("button:contains('Reset')").click(function(){
      self.reset();      

      return false;
    });

    $("button:contains('Add 1')").click(function(){
      self.add();      

      return false;
    });
  }
}

window.App = App;

window.addEventListener("load", function() {
  window.web3 = new Web3(fm.getProvider());
  fm.user.isLoggedIn().then(function(result){
    if(result == true){
      web3.eth.getAccounts(function(err, accs) {
		    console.log('Account = ', account = accs[0]);

        $('.user-address').text(accs[0]);

        AppContract.setProvider(web3.currentProvider);

        AppContract.deployed().then(function(contractInstance){
          instance = contractInstance;

          $("button:contains('Fortmatic Account')").click(function(){
            fm.user.deposit();
          });

          $("button:contains('Logout')").click(function(){
            fm.user.logout().then(function(success){
              if(success){
                location.reload();
              };
            });
          });

          return contractInstance.isUser.call(accs[0]).then(function(isIndeed){
            if(isIndeed){
              contractInstance.getIndexByAddress.call(accs[0]).then(function(_index){
                console.log('Index Account = ', indexAccount = _index.toNumber());
              }).then(() => {
                console.log('success');
                $('#login, #nameForm').css('display','none');
                $('.content').css('display','flex');
                App.start();
              }).then(() => {
                $('#loader').css('display','none');
              }).catch(function(e) {
                // There was an error! Handle it.
                console.log('error = ', e);
              });
            } 
            else{
              console.log('!success');
              $('#nameForm').css('display','flex');
              $('.content, #login').css('display','none');
              $('#loader').css('display','none');

              $("button:contains('Submit')").click(function(e){
                e.preventDefault();

                let name = web3.fromAscii($("input[name=name]").val());
                
                return contractInstance.createUser(accs[0], name, {gas: 200000, gasPrice: 1000000000, from: accs[0]}).then(function(success){
                  if(success){
                    location.reload();
                  }
                  else{
                    alert('Failed to Submit');
                  }
                }).catch(function(e) {
                  // There was an error! Handle it.
                  console.log('error = ', e);
                });

              });
            }
          });
        });
      });
    } else{
      $('#login').css('display','flex');
      $('.content, #nameForm').css('display','none');
      $('#loader').css('display','none');

      fm.user.login().then(() => {
          location.reload();
        });
      
      $("button:contains('Login/SignUp')").click(function(){
        fm.user.login().then(() => {
          location.reload();
        });

        return false;
      });
    }
  });
});