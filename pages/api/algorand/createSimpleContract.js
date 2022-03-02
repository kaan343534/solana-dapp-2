import  algosdk  from 'algosdk'
import { makeAssetTransferTxnWithSuggestedParams } from 'algosdk'
import fs from 'fs/promises'
import path from 'path'


// Optional fields in body: content

export default async function handle(req, res) {
    let approvalProgram
    let clearProgram
    

    const senderAccount = "TSO2E5RJYORENP3S22S6RPKNP7QZTCOGG3AWTY5YDPG6FQM3Y2YNWUSLEE"
    const algodServerPurestake = 'https://testnet-algorand.api.purestake.io/ps2'
    const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
    const token = { 'X-API-Key': 'Tlr47UJJmT9iXhIH7Ztg48veRki5l51l7z75rNxa'}
    const port = '';
    //const indexerClient = new algosdk.Indexer(token, indexerServer, port);
    // Connect your client
    const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const algodServer = 'http://localhost';
    const algodPort = 4001;
    let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

    
    
    //let algodClientPurestake = new algosdk.Algodv2(token, algodServerPurestake, port);
   
    

    //const indexerClient = new algosdk.Indexer(token, indexerServer, port);
    const localInts = 0
    const localBytes = 0
    const globalInts = 1
    const globalBytes = 0
    
    const onComplete = algosdk.OnApplicationComplete.NoOpOC
    const project_root = path.resolve('./artifacts')
    const filePathApprovalProg = path.join(project_root, 'counter_program.teal')
    //const approvalProgData = await fs.readFile(filePathApprovalProg)
    const approvalProgData = await (await fs.readFile(filePathApprovalProg, { encoding: 'utf8'}))
    const filePathClearProg = path.join(project_root, 'clear_program.teal')
    //const clearProgData =  await fs.readFile(filePathClearProg)
    const clearProgData =  await (await fs.readFile(filePathClearProg, { encoding: 'utf8'}))
    //console.log('Approval program: \n', approvalProgData )
    console.log('Clear program: \n', clearProgData )



       //console.log(e)

     const compileProgram = async (client, programSource) => {
         //let encoder = new TextEncoder()
         //let programBytes = encoder.encode(programSource)
         let compileResponse = await algodClient.compile(programSource).do()
         if (compileResponse.result && compileResponse.hash) {
           let compiledBytes = new Uint8Array(Buffer.from(compileResponse.result, "base64"))
           console.log('Compiled program response program: /n', compileResponse.result )
           return compiledBytes
         }
         console.log('compile program sub failed with returned message: ', compileResponse.message)
         return
     }
    /* 
    algodClientPurestake.healthCheck().do()
    .then(d => { 
        console.log("Inside health check promise: " + JSON.stringify(d)); 
        
        })
        .catch(e => { 
        console.error("health check error: " + JSON.stringify(e)); 
    });

    // receiver defined as TestNet faucet address 
    */
    //const receiver = receiverAccount
    const enc = new TextEncoder();
    const note = enc.encode('Simple Contract');
    //const amount = txnAmount
    const sender = senderAccount
    
    let tx  
    let txParams
    let signedTxs = []
    
    try {
        txParams = await algodClient.getTransactionParams().do()
        approvalProgram = await compileProgram(algodClient, approvalProgData) 
        clearProgram = await compileProgram(algodClient, clearProgData) 
    }
    catch (err) {
        console.log('Error occured during compilation: ', err.message)
        res.status(400).json({error: 'Error occured during contract compilation'})
    }
    
    const txn = algosdk.makeApplicationCreateTxn(senderAccount, txParams, onComplete, approvalProgram, clearProgram, localInts,
                                                    localBytes, globalInts, globalBytes,)
    //let txId = txn.txId().toString()
    //let txBytes = txn.toByte()
    const pay_txn_bytes = algosdk.encodeObj(txn.get_obj_for_encoding())
    const txn_b64=  Buffer.from(pay_txn_bytes).toString("base64")
    res.status(200).json({txn_b64});
}