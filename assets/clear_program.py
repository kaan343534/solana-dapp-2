
from pyteal import *
import io

def clear_program():
    return Return(Int(1))

if __name__ == "__main__":
    with open("clear_program.teal", "w") as f:
        compiled = compileTeal(clear_program(), Mode.Application, version=4)
        f.write(compiled)
        f.close()