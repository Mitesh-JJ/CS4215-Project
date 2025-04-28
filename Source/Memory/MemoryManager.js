import { TypeTraits } from "../Type/TypeTraits.js";
import { SerializeUint } from "../Type/TypeIO.js";

import { MemoryArray } from "./MemoryArray.js";
import { AllocatorPolicy } from "./AllocatorPolicy.js";
import { PartitionReference } from "./PartitionReference.js";

export class MemoryManager
{
    constructor()
    {
        this.Buffer = new MemoryArray(100);
        this.AllocProc = AllocatorPolicy.FirstFit;

        // [NOTE] Creates the root partition at offset 1
        this.Buffer.Write(1, SerializeUint(this.Buffer.Size() - 1));
    }

    Allocate(Type, Value, IsConst)
    {
        const Traits = TypeTraits.GetTraits(Type);
        const PartRef = this.AllocProc(this.Buffer, Traits.Size(Value) + 7);
        this.Buffer.Write(PartRef.Offset + 4, [1]);
        this.Buffer.Write(PartRef.Offset + 5, [IsConst]);
        this.Buffer.Write(PartRef.Offset + 6, [Type]);
        this.Buffer.Write(PartRef.Offset + 7, Traits.Serialize(Value));
        return PartRef;
    }
    
    Deallocate(PartitionRef)
    {
        if(PartitionRef.Offset == 0)
            return

        const NewCount = [PartitionRef.RefCount() - 1];
        this.Buffer.Write(PartitionRef.Offset + 4, NewCount);
        PartitionRef.Offset = 0;
        PartitionRef.Buffer = null;
    }

    Duplicate(PartitionRef)
    {
        const Copy = new PartitionReference(this.Buffer, PartitionRef.Offset);
        const NewCount = [Copy.RefCount() + 1];
        this.Buffer.Write(Copy.Offset + 4, NewCount);
        return Copy;
    }
};