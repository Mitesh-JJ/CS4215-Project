import { MemoryManager } from "../Memory/MemoryManager.js"
import { MemoryCell } from "../Memory/MemoryCell.js";

import { TypeID } from "../Type/TypeID.js";

import { Environment } from "./Environment.js";
import { RuntimeStack } from "./RuntitmeStack.js";

import { Logger } from "../Utils/Logger.js";

export class ExecutionEngine
{
    constructor()
    {
        this.GlobalEnv = new Environment();
        this.Stack = new RuntimeStack();
        this.MemCell = new MemoryCell(100);
        this.MemManager = new MemoryManager(this.MemCell);
    }

    Execute(Instruction)
    {
        const Subroutines =
        {
            PRINT: (Instruction) =>
            {
                console.log(this.Stack.Peek());
            },

            POP: (Instruction) =>
            {
                this.Stack.Pop();
            },

            LOADC: (Instruction) =>
            {
                this.Stack.Push(Instruction.Value);
            },

            LOAD: (Instruction) =>
            {
                const Reference = this.GlobalEnv.Get(Instruction.Identifier);
                const Value = Reference.GetValue();
                this.Stack.Push(Value);
            },

            ASSIGN: (Instruction) =>
            {
                const Value = this.Stack.Peek();
                const IsConst = false;
                const Reference = this.MemManager.Allocate(TypeID.Float, Value, IsConst);
                this.GlobalEnv.Add(Instruction.Identifier, Reference.Duplicate());
                Reference.Detach();
            }
        }

        const Proc = Subroutines[Instruction.OpCode];
        if(Proc == undefined)
            Logger.RaiseException(`Invalid Operation "${OpCode}"`);
        Proc(Instruction);
    }

    DumpStack()
    {
        Logger.Info(`Stack Dump (${this.Stack.Data.length})`);
        for(let i = 0; i < this.Stack.Data.length; i++)
            Logger.Info(`[${i}] ${this.Stack.Data[i]}`);
    }
};
