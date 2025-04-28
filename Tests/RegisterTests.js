import { Logger } from "../Source/Utils/Logger.js";
import { TypeID } from "../Source/Type/TypeID.js";

import { EnvironmentStack } from "../Source/Registers/EnvironmentStack.js";
import { ProgramBuffer } from "../Source/Registers/ProgramBuffer.js";
import { MemoryManager } from "../Source/Memory/MemoryManager.js";

try
{
    const MemController = new MemoryManager();
    const EnvRegister = new EnvironmentStack();

    // [NOTE] Global Decl. 
    EnvRegister.Define("GVar1", MemController.Allocate(TypeID.Float, 10.01, true));
    EnvRegister.Define("GVar2", MemController.Allocate(TypeID.Float, 20.01, true));

    // [NOTE] Loca Decl.
    EnvRegister.Push();
    EnvRegister.Define("LVar1", MemController.Allocate(TypeID.Float, 10.02, true));
    EnvRegister.Define("LVar2", MemController.Allocate(TypeID.Float, 20.02, true));

    EnvRegister.Dump();

    const ProgRegister = new ProgramBuffer();
    ProgRegister.Import("./Scripts/Test.json");

    while(true)
    {
        const Instruction = ProgRegister.Advance();
        Logger.Info(Instruction);
    }

}
catch(Error)
{
    Logger.Error(Error.message);
}