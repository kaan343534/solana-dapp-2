import { algosdk } from '../../services/AlgoService'

const useSDKProvider = () => {
    const algodToken = process.env.ALGO_TOKEN || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const algodServer = process.env.ALGOD_SERVER || 'http://localhost'
    const algodPort = process.env.ALGOD_PORT || 4001;
    const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    return algodClient
}
 
export default useSDKProvider