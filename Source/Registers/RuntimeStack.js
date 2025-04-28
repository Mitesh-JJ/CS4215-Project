import { Logger } from "../Utils/Logger.js";

export class RuntimeStack
{
    constructor()
    {
        this.Buffer = [];
    }

    Peek()
    {
        if(this.Size() == 0)
            Logger.RaiseException("Empty Stack Exception");
        return this.Buffer[this.Size() - 1];
    }

    Push(Value)
    {
        this.Buffer.push(Value);
    }

    Pop()
    {
        if(this.Size() == 0)
            Logger.RaiseException("Stack undeflow");
        return this.Buffer.pop();
    }

    Size()
    {
        return this.Buffer.length;
    }

    Dump()
    {
        for(const Object of this.Buffer)
            Logger.Info(Object);
    }
}