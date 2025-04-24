import { TypeID } from "./TypeID.js";
import * as TypeIO from "./TypeIO.js";

export class TypeTraits
{
    static Int()
    {
        const Trait = {};
        Trait.Label = "Int";
        Trait.ID = TypeID.Int;
        Trait.Size = (Value = null) => { return 4; }
        Trait.Serialize = TypeIO.SerializeInt;
        Trait.Deserialize = TypeIO.DeserializeInt;

        return Trait;
    }

    static Uint()
    {
        const Trait = {};
        Trait.Label = "Uint";
        Trait.ID = TypeID.Uint;
        Trait.Size = (Value = null) => { return 4; }
        Trait.Serialize = TypeIO.SerializeUint;
        Trait.Deserialize = TypeIO.DeserializeUint;

        return Trait;
    }

    static Float()
    {
        const Trait = {};
        Trait.Label = "Float";
        Trait.ID = TypeID.Float;
        Trait.Size = (Value = null) => { return 8; }
        Trait.Serialize = TypeIO.SerializeFloat;
        Trait.Deserialize = TypeIO.DeserializeFloat;

        return Trait;
    }

    static String()
    {
        const Trait = {};
        Trait.Label = "String";
        Trait.ID = TypeID.String;
        Trait.Size = (Value) => { return Value.length; }
        Trait.Serialize = TypeIO.SerializeString;
        Trait.Deserialize = TypeIO.DeserializeString;

        return Trait;
    }

    static GetTraits(ID)
    {
        switch(ID)
        {
            case TypeID.Int:
                return TypeTraits.Int();
            
            case TypeID.Uint:
                return TypeTraits.Uint();

            case TypeID.Float:
                return TypeTraits.Float();

            case TypeID.String:
                return TypeTraits.String();
        }
    }
}