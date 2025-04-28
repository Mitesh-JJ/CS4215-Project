import fs from 'fs';
import { Logger } from '../Utils/Logger.js';

export class ProgramBuffer
{
    constructor()
    {
        this.Buffer = [{ "OPCODE": "EOE" }];
        this.Counter = -1;
    }

    Import(FilePath)
    {
        this.Counter = -1;
        this.Buffer = fs.readFileSync(FilePath);
        this.Buffer = JSON.parse(this.Buffer);
        Logger.Info(this.Buffer);
    }

    JumpTo(Index)
    {
        if(Index < 0 || Index >= this.Buffer.length)
            Logger.Error(`Invalid jump address: ${Index}`);
        this.Counter = Index - 1;
    }

    Advance()
    {
        this.Counter += 1;
        if(this.Counter >= this.Buffer.length)
            Logger.RaiseException("Malformed program")
        return this.Buffer[this.Counter];
    }
};