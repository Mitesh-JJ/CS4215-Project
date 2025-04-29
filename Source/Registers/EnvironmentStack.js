import { Logger } from "../Utils/Logger.js";

export class EnvironmentStack
{
    constructor()
    {
        // [NOTE] Global Environment
        this.Buffer = [new Map()];
    }

    IsDefined(Identifier)
    {
        for(const EnvMap of this.Buffer)
            if(EnvMap.has(Identifier))
                return true;
        return false;
    }

    Define(Identifier, Reference)
    {
        if(this.IsDefined(Identifier))
            Logger.RaiseException("Attempting to redefine an existing variable");
        this.Buffer[this.Buffer.length - 1].set(Identifier, Reference);
    }

    Get(Identifier)
    {
        for(const EnvMap of this.Buffer)
            if(EnvMap.has(Identifier))
                return EnvMap.get(Identifier);
        Logger.RaiseException(`Undefined identifier ${Identifier}`);
    }

    Push()
    {
        this.Buffer.push(new Map());
    }

    Pop()
    {
        if(this.Buffer.length == 1)
            Logger.RaiseException("Illegal pop operation");
        return this.Buffer.pop();
    }

    Dump()
    {
        for(const EnvMap of this.Buffer)
            EnvMap.forEach((Value, Key, Map) => { Logger.Info(`${Key} : ${Value.GetValue()}`) });
    }
};
