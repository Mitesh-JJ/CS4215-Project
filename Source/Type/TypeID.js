export class TypeID
{
    static Invalid = 0;
    static Int = 1;
    static Uint = 2;
    static Float = 3;
    static String = 4;
    static Reference = 5;
}

export function DeduceType(Value)
{
    const TypeConv = 
    {
        "string": TypeID.String,
        "number": TypeID.Float,
        "boolean": TypeID.Uint
    };
    return TypeConv[typeof Value];
}