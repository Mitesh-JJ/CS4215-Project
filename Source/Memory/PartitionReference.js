import { Logger } from "../Utils/Logger.js";
import { TypeTraits } from "../Type/TypeTraits.js";
import { DeserializeUint } from "../Type/TypeIO.js";

export class PartitionReference
{
    constructor(Buffer, Offset)
    {
        this.Offset = Offset;
        this.Buffer = Buffer;

        // [NOTE] Read only attribs.

        this.Size = () => { return DeserializeUint(this.Buffer.Read(this.Offset, 4)); }
        this.RefCount = () => { return this.Buffer.Read(this.Offset + 4, 1)[0]; };
        this.IsConst = () => { return this.Buffer.Read(this.Offset + 5, 1)[0]; };
        this.PayloadType = () => { return this.Buffer.Read(this.Offset + 6, 1)[0]; };
        this.PayloadData = () => { return this.Buffer.Read(this.Offset + 7, this.Size() - 7); };
    }

    VerifyValidity()
    {
        if(this.Offset == 0)
            Logger.RaiseException("Invalid partition reference");
    }

// [NOTE] Payload Accessors -----------------------------------------------------------------------------

    GetValue()
    {
        this.VerifyValidity();
        const Traits = TypeTraits.GetTraits(this.PayloadType());
        return Traits.Deserialize(this.PayloadData()); 
    }

    SetValue(Value)
    {
        this.VerifyValidity();
        if(this.IsConst())
            Logger.Error("Attempting to modify a constant");

        const Traits = TypeTraits.GetTraits(this.PayloadType());
        this.Buffer.Write(this.Offset + 7, Traits.Serialize(Value));
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