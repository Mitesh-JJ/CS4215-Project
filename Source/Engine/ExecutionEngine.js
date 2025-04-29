import { Logger } from "../Utils/Logger.js";
import { LabelBuffer } from "../Registers/LabelBuffer.js";
import { RuntimeStack } from "../Registers/RuntimeStack.js";
import { ProgramBuffer } from "../Registers/ProgramBuffer.js";
import { EnvironmentStack } from "../Registers/EnvironmentStack.js";

import { MemoryManager } from "../Memory/MemoryManager.js";

import { Subroutines } from "./Subroutines.js";

export class ExecutionEngine
{
    constructor()
    {
        this.Stack = new RuntimeStack();
        this.Memory = new MemoryManager();
        this.LabelArray = new LabelBuffer();
        this.Environment = new EnvironmentStack();
        this.ProgramCounter = new ProgramBuffer();
    }

    Execute(FilePath = null)
    {
        const Begin = Date.now();
        if(FilePath != null)
            this.ProgramCounter.Import(FilePath);

        while(true)
        {
            const Instruction = this.ProgramCounter.Advance();
            if(Instruction.OPCODE == "END")
                break;

            const Proc = Subroutines[Instruction.OPCODE];
            if(Proc == undefined)
                Logger.RaiseException(`Invalid Operation: ${Instruction.OPCODE}`);

            Proc(this, Instruction);
        }

        Logger.Info(`Execution successful (${Date.now() - Begin}ms)`);
    }
};