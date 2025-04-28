import { Logger } from "../Utils/Logger.js";
import { SerializeUint } from "../Type/TypeIO.js";
import { PartitionReference } from "./PartitionReference.js";


export class AllocatorPolicy
{
    static FirstFit(Buffer, Size)
    {
        let Offset = 1
        while(Offset < Buffer.Size())
        {
            let PartRef = new PartitionReference(Buffer, Offset);
            if(PartRef.RefCount() == 0 && PartRef.Size() >= Size)
            {
                const Residue = PartRef.Size() - Size;
                Buffer.Reset(Offset, PartRef.Size() - 1);
                Buffer.Write(Offset, SerializeUint(Size));

                if(Residue > 0)
                    Buffer.Write(Offset + Size, SerializeUint(Residue));
                return PartRef;
            }
            Offset += PartRef.Size();
        }

        Logger.RaiseException("Unable to find a compatible memory partition");
    }
};