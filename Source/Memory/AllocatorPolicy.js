import { Logger } from "../Utils/Logger.js";
import { SerializeUint, DeserializeUint } from "../Type/TypeIO.js";

export class AllocatorPolicy
{
    static FirstFit(Source, Size)
    {
        let Offset = 1
        while(Offset < Source.Size())
        {
            let PartSize = DeserializeUint(Source.Read(Offset, 4));
            let RefCount = Source.Read(Offset + 4, 1)[0];
            let Residue = PartSize - Size;

            if(RefCount == 0 && PartSize >= Size)
            {
                Source.Write(Offset, SerializeUint(Size));
                if(Residue > 0)
                    Source.Write(Offset + Size, SerializeUint(Residue));
                return Offset;
            }
            Offset += PartSize;
        }

        Logger.RaiseException("Unable to find a compatible memory partition");
    }
};