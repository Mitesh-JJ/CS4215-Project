import { Logger } from "../Utils/Logger.js";

export class MemoryCell
{
    constructor(Size)
    {
        this.Buffer = new ArrayBuffer(Size)
        this.View = new Uint8Array(this.Buffer);
    }

    Read(Offset, Size = 1)
    {
        if(Offset + Size > this.Size())
            Logger.RaiseException("Segmentation fault");
        return this.View.slice(Offset, Offset + Size);
    }

    Write(Offset, Data)
    {
        if(Offset + Data.length > this.Size())
            Logger.RaiseException("Segmentation fault");
        this.View.set(Data, Offset);
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