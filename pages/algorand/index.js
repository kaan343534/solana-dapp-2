import { algosdk } from '../../services/AlgoService'
import { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'
import { makeAssetTransferTxnWithSuggestedParams } from 'algosdk'


const CreateTestAccount = () => {
    const defaultAccount = process.env.DEFAULT_ALGO_ACCOUNT || "TSO2E5RJYORENP3S22S6RPKNP7QZTCOGG3AWTY5YDPG6FQM3Y2YNWUSLEE"
     const [account, setAccount] = useState(defaultAccount)
    const [mnemonic, setMnemonic] = useState("")
    const [receiverAccount, setReceiverAccount] = useState()
    const [senderAccount, setSenderAccount] = useState("")
    const [txnAmount, setTxnAmount] = useState("")
    const [txnNote, setTxnNote] = useState("")
    const [accountValue, setAccountValue] = useState('')
    const [algosignerStatus, setAlgosignerStatus] = useState({connected: false, accounts: {}})

    const algodToken = process.env.ALGO_TOKEN || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const algodServer = process.env.ALGOD_SERVER || 'http://localhost'
    const algodPort = process.env.ALGOD_PORT || 4001;
    let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    //const algodClient = useSDKProvider()


    const checkAccount = async (e) => {
        e.preventDefault()
        console.log(e)
        try {
          let newAccountInfo = await algodClient.accountInformation(account).do()
          setAccountValue(newAccountInfo.amount)
          console.log(accountValue)

        }
        catch (err) {
          console.log("err", err);
        }
    }

     const testTxn = async (e) => {
        e.preventDefault()
        console.log(e)
        try {

        // Construct the transaction
        console.log("Wil get suggested params from testnet")
        let params = await algodClient.getTransactionParams().do();
        // comment out the next two lines to use suggested fee
        params.fee = algosdk.ALGORAND_MIN_TX_FEE;
        params.flatFee = true;

        // receiver defined as TestNet faucet address 

        const receiver = receiverAccount
        const enc = new TextEncoder();
        const note = enc.encode("Test Txn");
        let amount = txnAmount
        let sender = senderAccount
        let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: receiver, 
            amount: amount, 
            note: note, 
            suggestedParams: params


        });

         // Sign the transaction
        const mnemonic2 = process.env.MNEMONIC || 'setup betray chaos million hungry erode scrap private tourist antique cover curious grant victory tribe find wear strong kidney utility gloom laugh club abstract scheme'
        console.log(mnemonic2)
        const senderAccountSk = await algosdk.mnemonicToSecretKey(mnemonic2);
        console.log(senderAccountSk)
        let signedTxn = txn.signTxn(senderAccountSk.sk);
        let txId = txn.txID().toString();
        console.log("Signed transaction with txID: %s", txId);

        // Submit the transaction
        await algodClient.sendRawTransaction(signedTxn).do();

        // Wait for confirmation
        let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
        //Get the completed Transaction
        console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        var string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
        console.log("Note field: ", string);
        const accountInfo = await algodClient.accountInformation(senderAccountSk.addr).do();
        console.log("Transaction Amount: %d microAlgos", confirmedTxn.txn.txn.amt);        
        console.log("Transaction Fee: %d microAlgos", confirmedTxn.txn.txn.fee);

        console.log("Account balance: %d microAlgos", accountInfo.amount);

        }
        catch (err) {
          console.log("err", err);
        }
    }

     const testTxnAlgosigner = async (e) => {
        e.preventDefault()
        //console.log(e)
        const algodServerPurestake = 'https://testnet-algorand.api.purestake.io/ps2'
        const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
        const token = { 'X-api-key': 'Tlr47UJJmT9iXhIH7Ztg48veRki5l51l7z75rNxa'}
        const port = '';

       const algodClientPurestake = new algosdk.Algodv2(token, algodServerPurestake, port);
        const indexerClient = new algosdk.Indexer(token, indexerServer, port);
        // Connect your client
        const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        const algodServer = 'http://localhost';
        const algodPort = 4001;
        //let algodClientPurestake = new algosdk.Algodv2(algodToken, algodServer, algodPort);

        algodClientPurestake.healthCheck().do()
        .then(d => { 
           console.log("Inside health check promise: " + JSON.stringify(d)); 
           
         })
         .catch(e => { 
           console.error("health check error: " + JSON.stringify(e)); 
        });

       // receiver defined as TestNet faucet address 

        const receiver = receiverAccount
        const enc = new TextEncoder();
        const note = enc.encode(txnNote);
        const amount = txnAmount
        const sender = senderAccount
        
        let tx
        let txParams
        let signedTxs = []
        
        try {
          txParams = await algodClientPurestake.getTransactionParams().do()
        }
        catch (err) {
          console.log(e)
        }
       
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: senderAccount,
          to: receiverAccount,
          amount: amount,
          note: note,
          suggestedParams: {...txParams}
      });

        let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
        try {
          await AlgoSigner.connect()
          await AlgoSigner.algod({
              ledger: 'TestNet',
              path: '/v2/transactions/params'
           })
          
        }
        catch (err) {
          console.log(e)
        }
 
        
       
        try {
          signedTxs = await AlgoSigner.signTxn([{txn: txn_b64}])
        }
        catch (e) {
          console.error(e)
        }

        AlgoSigner.send({
           ledger: 'TestNet',
           tx: signedTxs[0].blob
         })

        .then((tx) => waitForAlgosignerConfirmation(tx))
        .catch(e => console.error(e))
        /*
        .then((txParams) => AlgoSigner.sign({
            from: sender, 
            to: receiver, 
            amount: amount, 
            note: note, 
            type: 'pay',
            fee: txParams['min-fee'],
            firstRound: txParams['last-round'],
            lastRound: txParams['last-round'] + 1000,
            genesisID: txParams['genesis-id'],
            genesisHash: txParams['genesis-hash'],
            flatFee: true
        }))
        .then((signedTx) => AlgoSigner.send({
          ledger: 'TestNet',
          tx: signedTx.blob()
        }))
        .then((tx) => waitForAlgosignerConfirmation(tx))
        */
      
    }
    
    const createAccount = async () => {
        try {
          const newAccount = await algosdk.generateAccount()
          let newMnemonic = await algosdk.secretKeyToMnemonic(newAccount.sk)
          setAccount(newAccount.addr)
          setMnemonic(newMnemonic)
          console.log(newAccount.addr)
        }
        catch (err) {
          console.log("err", err);
        }
    }

     const connectAlgosigner = async () => {
       try {
        AlgoSigner.connect()
        .then(() => AlgoSigner.accounts({
          ledger: 'TestNet'
        }))
        .then((accountdata) => {
           setAlgosignerStatus({ connected: true, accounts: accountdata})
           
        })
       }
       catch (err) {
         console.log(err)
       }

    }

   const disconnectAlgosigner = async () => {
       if (algosignerStatus.connected === false) return
       try {
        //AlgoSigner.disconnectAlgosigner
       }
       catch (err) {
         console.log(err)
       }

    }


async function waitForAlgosignerConfirmation(tx) {
  console.log(`Transaction ${tx.txId} waiting for confirmation...`);
  let status = await AlgoSigner.algod({
    ledger: 'TestNet',
    path: '/v2/transactions/pending/' + tx.txId
  });

  while(true) {
    if(status['confirmed-round'] !== null && status['confirmed-round'] > 0) {
      //Got the completed Transaction
      console.log(`Transaction confirmed in round ${status['confirmed-round']}.`);
      break;
    }

    status = await AlgoSigner.algod({
      ledger: 'TestNet',
      path: '/v2/transactions/pending/' + tx.txId
    });
  }
  
  return tx;
}

    return (
<div className='container flex flex-col max-w-4xl mx-auto bg-blue-100/50 rounded-lg my-6'>
         <div className='flex flex-col p-4 mx-auto w-1/2 space-y-8 items-center m-4'>
            <h2 className='text-2xl font-semibold'>Create Test Account</h2>
            <button className='border-2 w-20 rounded-lg bg-blue-700 text-white font-semibold px-4 py-2' onClick={createAccount}>Create</button>
            {((account) && (account != "")) ? (<div className='flex flex-col space-y-2 p-2'>
               <div><span>{account}</span></div>
               <div><span>{mnemonic}</span></div>
               </div>
            ) : (
               <div><span className='text-center text-xl px-4'>No Account</span></div>
            )}
         </div>
         <div className='p-4 flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-semibold'>Check Account Balance</h2>
             <form onSubmit={checkAccount} className='flex flex-col items-left space-y-4 p-4 '>
               <div className='flex space-x-4 '><label htmlFor="account" className='text-xl font-semibold text-left'>Account </label>
               <input id="account" type="text" name="account" value={account} maxLength={90}  onChange={(e) => { setAccount(e.target.value)}} /></div>
               <div className='flex space-x-4 '><label htmlFor="accountValue" className='text-xl font-semibold text-left'>Account Value</label>
               <input type="text" id="accountValue" name="accountValue" value={accountValue}  onChange={(e) => {setAccountValue(e.target.value)}}/></div>
               <div className='flex justify-center items-center max-w-sm'><button type="submit" value="Check" className='bg-blue-700 rounded-xl  text-white font-semibold px-4 py-2 transition duration-150 ease-in-out hover:bg-blue-900'>Check</button></div>

             </form>
         </div>
          <div className='p-4 flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-semibold'>Test Transaction</h2>
             <form onSubmit={testTxn} className='flex flex-col items-left space-y-4 p-4 '>
                <div className='flex space-x-4 '><label htmlFor="receiverAccount" className='text-xl font-semibold text-left'>Receiver Account </label>
               <input id="receiverAccount" type="text" name="receiverAccount" value={receiverAccount} maxLength={90}  onChange={(e) => { setReceiverAccount(e.target.value)}} /></div>
               <div className='flex space-x-4 '><label htmlFor="senderAccount" className='text-xl font-semibold text-left'>Sender Account </label>
               <input id="senderAccount" type="text" name="senderAccount" value={senderAccount} maxLength={90}  onChange={(e) => { setSenderAccount(e.target.value)}} /></div>
               <div className='flex space-x-4 '><label htmlFor="txnAmount" className='text-xl font-semibold text-left'>Transaction Amount</label>
               <input type="text" id="txnAmount" name="txnAmount" value={txnAmount}  onChange={(e) => {setTxnAmount(Number(e.target.value))}}/></div>
               <div className='flex space-x-4 '><label htmlFor="txnNote" className='text-xl font-semibold text-left'>Transaction Note</label>
               <input type="text" id="txnNote" name="txnNote" value={txnNote}  onChange={(e) => {setTxnNote(e.target.value)}}/></div>
               <div className='flex justify-center items-center max-w-sm space-x-6'><button type="submit" value="Check" className='bg-blue-700 rounded-xl  text-white font-semibold px-4 py-2 transition duration-150 ease-in-out hover:bg-blue-900'>Test Txn</button>
               <button onClick={testTxnAlgosigner} className='bg-blue-700 rounded-xl  text-white font-semibold px-4 py-2 transition duration-150 ease-in-out hover:bg-blue-900'>AlgoSigner</button>
               </div>

             </form>
         </div>
         <div className='p-6 flex items-center justify-center'>
           <div className='flex flex-col items-center justify-center max-w-md'>
              <div><p className='text-center text-lg font-normal px-4 py-2 capitalize'>{algosignerStatus.connected ?  "Connected. " + JSON.stringify(algosignerStatus.accounts) : "Not connected."}
                </p></div>
                <div className='flex justify-between px-4 py-4 space-x-4 '>
                  <div><button onClick={connectAlgosigner} className="bg-blue-700 max-w-sm min-w-max rounded-2xl px-4 py-2 text-white font-semibold">AlgoSigner</button></div>
                  <div><button onClick={disconnectAlgosigner} className="bg-blue-700 max-w-sm min-w-max rounded-2xl px-4 py-2 text-white font-semibold">Disconnect</button></div>
                </div>
           </div>
         </div>
      </div>
  )
}

export default CreateTestAccount