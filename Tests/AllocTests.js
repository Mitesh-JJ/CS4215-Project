import { Logger } from "../Source/Utils/Logger.js";
import { TypeID } from "../Source/Type/TypeID.js";
import { MemoryManager } from "../Source/Memory/MemoryManager.js";

try
{
    const MemController = new MemoryManager();

    let Index = MemController.Allocate(TypeID.Uint, 0, true);
    while(Index.GetValue() < 1000)
    {
        const Current = Index.GetValue();
        MemController.Deallocate(Index);
        console.log(Current);
        Index = MemController.Allocate(TypeID.Uint, Current + 1, true);
    }
}
catch(Error)
{
    Logger.Error(Error.message);
}
