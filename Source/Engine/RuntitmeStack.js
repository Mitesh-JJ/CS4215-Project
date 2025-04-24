import { Logger } from "../Utils/Logger.js";

export class RuntimeStack
{
    constructor()
    {
        this.Data = [];
        this.Size = 0;
    }

    Peek()
    {
        if(this.length == 0)
            Logger.RaiseException("Segmentation fault");
        return this.Data[this.Data.length - 1];
    }

    Push(Value)
    {
        this.Data.push(Value);
    }

    Pop()
    {
        if(this.Data.length == 0)
            Logger.RaiseException("Stack undeflow");
        return this.Data.pop();
    }

    Size()
    {
        return this.Data.length;
    }
}