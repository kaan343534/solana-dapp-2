from pyteal import *

def counter_program():
    """
    This smart contract implements stateful counter
    """
    var_counter = Bytes("counter")
    counter = App.globalGet(var_counter)
    
    init_counter = Seq([
        App.globalPut(var_counter, Int(0)),
        Return(Int(1))
       ])

    add_one = Seq([
        App.globalPut(var_counter, counter + Int(1)),
        Return(Int(1))
    ])

    program = Cond(
        [Txn.application_id() == Int(0), init_counter],
        [Txn.on_completion() == OnComplete.NoOp, add_one],
        [Int(1), Return(Int(1))]
    )

    return program

if __name__ == "__main__":
    with open("artifacts/counter_program.teal", "w") as f:
        compiled = compileTeal(counter_program(), Mode.Application, version=4)
        f.write(compiled)
        f.close()