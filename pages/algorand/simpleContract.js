import { algosdk } from '../../services/AlgoService'
import { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'
import { makeAssetTransferTxnWithSuggestedParams } from 'algosdk'


const SimpleContract = () => {
    let txn_b64
    let signedTxs
    const [senderAccount, setSenderAccount] = useState("TSO2E5RJYORENP3S22S6RPKNP7QZTCOGG3AWTY5YDPG6FQM3Y2YNWUSLEE")
    const algodServerPurestake = 'https://testnet-algorand.api.purestake.io/ps2'
    const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
    const token = { 'X-api-key': 'Tlr47UJJmT9iXhIH7Ztg48veRki5l51l7z75rNxa'}
    const port = '';

    const algodClientPurestake = new algosdk.Algodv2(token, algodServerPurestake, port);
    const indexerClient = new algosdk.Indexer(token, indexerServer, port);

    const testTxnAlgosigner = async () => {
        try {
           const res = await  fetch('/api/algorand/createSimpleContract', {method: 'GET', headers: { 'Content-Type': 'application/json'}})
           const data  = await res.json()
           txn_b64 = data.txn_b64 
           console.log('txn :', txn_b64)
        } catch (e) {
          console.log(e)
          return
        }

        try {
           await AlgoSigner.connect()
           await AlgoSigner.algod({ ledger: 'TestNet',path: '/v2/transactions/params' })
        
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
        <div className='p-4 min-h-[50%] min-w-2xl mx-auto'>
          <div className="flex justify-center items-center  bg-sky-100/50">
             <div className='"flex space-y-4 items-center justify-center px-8 py-4 my-10 '>
               <div className='block'><h2 className='text-center text-2xl text-gray-600 font-semibold'>Create SmartContract</h2></div>
               <div className='justify-center items-center '><button  className="px-4 py-2 ml-8 min-w-sm bg-blue-400 text-white text-center font-semibold rounded-lg border border-transparent" onClick={() => testTxnAlgosigner()}>Create Contract</button></div>
             </div>
          </div>
        </div>
    )
}

// to use libraries from Node here

    
export default SimpleContract