import { TypeTraits } from "../Type/TypeTraits.js";
import { SerializeUint } from "../Type/TypeIO.js";
import { AllocatorPolicy } from "./AllocatorPolicy.js";
import { MemoryReference } from "./MemoryReference.js";

export class MemoryManager
{
    constructor(Source)
    {
        this.Source = Source;
        this.AllocProc = AllocatorPolicy.FirstFit;

        // [NOTE] Creates the root partition at offset 1
        Source.Write(1, SerializeUint(Source.Size() - 1));
    }

    Allocate(Type, Value, IsConst = false)
    {
        const Traits = TypeTraits.GetTraits(Type);

        const Address = this.AllocProc(this.Source, 7 + Traits.Size(Value));
        this.Source.Write(Address + 5, [IsConst]);
        this.Source.Write(Address + 6, [Type]);
        this.Source.Write(Address + 7, Traits.Serialize(Value));

        const Reference = new MemoryReference();
        Reference.Attach(this.Source, Address);
        return Reference;
    }
};