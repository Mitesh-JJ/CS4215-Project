import { Logger } from "../Utils/Logger.js";
import { TypeTraits } from "../Type/TypeTraits.js";
import { DeserializeUint } from "../Type/TypeIO.js";

export class MemoryReference
{
    constructor()
    {
        this.Offset = 0;
        this.Source = null;

        this.Size = () => { return DeserializeUint(this.Source.Read(this.Offset, 4)); }
        this.RefCount = () => { return this.Source.Read(this.Offset + 4, 1)[0]; };
        this.IsConst = () => { return this.Source.Read(this.Offset + 5, 1)[0]; };
        this.PayloadType = () => { return this.Source.Read(this.Offset + 6, 1)[0]; };
        this.PayloadData = () => { return this.Source.Read(this.Offset + 7, this.Size() - 7); };
    }

// [NOTE] Ownership modfiers -----------------------------------------------------------------------------

    Attach(Souce, Offset)
    {
        if(this.Offset)
            this.Detach();

        this.Offset = Offset;
        this.Source = Souce;
        const ActiveRef = this.RefCount() + 1;
        this.Source.Write(this.Offset + 4, [ActiveRef]);
    }

    Detach()
    {
        if(this.Offset == 0)
            return;

        const ActiveRef = this.RefCount() - 1;
        this.Source.Write(this.Offset + 4, [ActiveRef]);
        this.Offset = 0;
        this.Source = null;
    }

    Duplicate()
    {
        const Result = new MemoryReference();
        Result.Attach(this.Source, this.Offset);
        return Result;
    }

// [NOTE] Payload Accessors -----------------------------------------------------------------------------

    GetValue()
    {
        if(this.Offset == 0)
            Logger.RaiseException("Invalid partition reference");
        const Traits = TypeTraits.GetTraits(this.PayloadType());
        return Traits.Deserialize(this.PayloadData()); 
    }

    SetValue(Value)
    {
        if(this.Offset == 0)
            Logger.RaiseException("Invalid partition reference");

        if(this.IsConst())
            Logger.Error("Attempting to modify a constant");

        const Traits = TypeTraits.GetTraits(this.PayloadType());
        this.Source.Write(this.Offset + 7, Traits.Serialize(Value));
    }

    // [NOTE] Debug Utils ------------------------------------------------------------------------------

    Dump()
    {
        console.log(`Size         : ${this.Size()}`);
        console.log(`Ref Count    : ${this.RefCount()}`);
        console.log(`Is Const     : ${this.IsConst()}`);
        console.log(`Payload Type : ${this.PayloadType()}`);
        console.log(`Payload Data : ${this.GetValue()} -> [${this.PayloadData()}]\n`);
    }
};