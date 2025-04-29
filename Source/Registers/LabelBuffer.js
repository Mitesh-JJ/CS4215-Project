import { Logger } from "../Utils/Logger.js";

export class LabelBuffer
{
    constructor()
    {
        this.Buffer = new Map();
    }

    IsDefined(Label)
    {
        return this.Buffer.has(Label);
    }

    Define(Label, Offset)
    {
        if(this.IsDefined(Label))
            Logger.RaiseException("Attempting to redefine an existing label");
        this.Buffer.set(Label, Offset);
    }

    Resolve(Label)
    {
        if(this.IsDefined(Label))
            return this.Buffer.get(Label)
        Logger.RaiseException(`Undefined label ${Label}`);
    }
};