import { Logger } from "../Utils/Logger.js";

export class Environment
{
    constructor(Parent = null)
    {
        // [NOTE] Env Inheritance
        this.Parent = Parent;
        this.Bindings = new Map();
    }

    Contains(Identifier)
    {
        let IsBound = this.Bindings.has(Identifier);
        if(!IsBound && this.Parent != null)
            IsBound = this.Parent.Contains(Identifier);
        return IsBound;
    }

    Add(Identifier, Reference)
    {
        if(this.Bindings.has(Identifier))
            Logger.RaiseException("Attempting to declare an existing variable");
        this.Bindings.set(Identifier, Reference);
    }

    Get(Identifier)
    {
        if(!this.Contains(Identifier))
            Logger.RaiseException(`Undefined identifier ${Identifier}`);

        let Result = this.Bindings.get(Identifier);
        if(Result == undefined && this.Parent != null)
            Result = this.Parent.Get(Identifier);
        return Result;
    }

    Dump()
    {
        this.Bindings.forEach((Value, Key, Map) => { Logger.Info(`${Key} : ${Value.GetValue()}`) });
    }
};
