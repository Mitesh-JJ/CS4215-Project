import { Logger } from "../Utils/Logger.js";

// ========================================================================= Serializers

export function SerializeFloat(Value)
{
    const Buffer = new ArrayBuffer(8);
    const View = new Float64Array(Buffer);
    View[0] = Value;
    return new Uint8Array(View.buffer);
}

export function SerializeInt(Value)
{
    const Buffer = new ArrayBuffer(4);
    const View = new Int32Array(Buffer);
    View[0] = Value;
    return new Uint8Array(View.buffer);
}

export function SerializeUint(Value)
{
    const Buffer = new ArrayBuffer(4);
    const View = new Uint32Array(Buffer);
    View[0] = Value;
    return new Uint8Array(View.buffer);
}

export function SerializeString(Value)
{
    const Utf8Encoder = new TextEncoder();
    return Utf8Encoder.encode(Value);
}

// ========================================================================= Deserializers

export function DeserializeFloat(Data)
{
    if(Data.length != 8)
        Logger.RaiseException("Invalid type conversion")
    const Value = new Float64Array(Data.buffer);
    return Value[0];
}

export function DeserializeInt(Data)
{
    if(Data.length != 4)
        Logger.RaiseException("Invalid type conversion")
    const Value = new Int32Array(Data.buffer);
    return Value[0];
}

export function DeserializeUint(Data)
{
    if(Data.length != 4)
        Logger.RaiseException("Invalid type conversion")
    const Value = new Uint32Array(Data.buffer);
    return Value[0];
}

export function DeserializeString(Data)
{
    const Utf8Decoder = new TextDecoder();
    return Utf8Decoder.decode(Data);
}