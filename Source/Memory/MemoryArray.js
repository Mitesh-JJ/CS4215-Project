import { Logger } from "../Utils/Logger.js";

export class MemoryArray
{
    constructor(Size)
    {
        this.Buffer = new ArrayBuffer(Size)
        this.View = new Uint8Array(this.Buffer);
    }

    Read(Offset, Size)
    {
        this.VerifyBounds(Offset, Size)
        return this.View.slice(Offset, Offset + Size);
    }

    Reset(Offset, Size)
    {
        this.VerifyBounds(Offset, Size);
        this.View.fill(0, Offset, Offset + Size)
    }

    Write(Offset, Data)
    {
        this.VerifyBounds(Offset, Data.length);
        this.View.set(Data, Offset);
    }

    VerifyBounds(Offset, Size)
    {
        const OffsetValidity = Offset >= 0 && Offset < this.Size();
        const SizeValidity = Size > 0 && Offset + Size < this.Size();
        if(!OffsetValidity || !SizeValidity)
            Logger.RaiseException("Segmentation fault");
    }

    Size()
    {
        return this.Buffer.byteLength;
    }

    Dump()
    {
        for(let i = 0; i < this.Size(); i++)
        {
            const Value = this.View.at(i);
            const Offset = i.toString(10).padStart(4, "0");
            const Binary = "0b" + Value.toString(2).padStart(8, '0');
            console.log(`${Offset} : ${Binary} (${Value})`);
        }
    }
}