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

var accounts;
var account;

const App = {
	start: function(){
    }
}

window.App = App;

window.addEventListener("load", function() {
    

  window.web3 = new Web3(fm.getProvider());

//   fm.user.isLoggedIn().then(function(result){
//     console.log('Login? ', result);
//     if(result == true){
//       web3.eth.getAccounts(function(err, accs) {
// 		console.log('Account = ', accs[0]);

//         AppContract.setProvider(web3.currentProvider);

//       });
//     } else{
//       fm.user.login().then(() => {
//           location.reload();
//         });
      
//       $("button:contains('Login')").click(function(){
//         fm.user.login().then(() => {
//           location.reload();
//         });

//         return false;
//       });
//     }
//   });

});