from pyteal import *

templ_receiver = Addr('7J4MCT5745TPHA3D3HWLPO3SPNOSHV4B2Q3WAJB5BMSPIDIUTAU4YIEDW4')
tmpl_fee = Int(1000)

def send_if_tx_properties():
    fee_cond = Txn.fee() <= tmpl_fee
    recv_cond = Txn.receiver() == templ_receiver

    program = And(fee_cond, recv_cond)
    return program

if __name__ == "__main__":
    print(compileTeal(send_if_tx_properties(),mode=Mode.Signature, version=5))