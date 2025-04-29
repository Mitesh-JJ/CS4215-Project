import { Logger } from "../Utils/Logger.js";
import { DeduceType } from "../Type/TypeID.js";

export const Subroutines = 
{
    POP: (Executor, Instruction) =>
    {
        Executor.Stack.Pop();
    },

    LOADC: (Executor, Instruction) =>
    {
        Executor.Stack.Push(Instruction.VALUE);
    },

    LOADV: (Executor, Instruction) =>
    {
        const MemRef = Executor.Environment.Get(Instruction.ID);
        Executor.Stack.Push(MemRef.GetValue());
    },

    DEFINE: (Executor, Instruction) =>
    {
        const Identifier = Instruction.ID;
        const IsConst = Instruction.ISCONST;
        const Value = Executor.Stack.Pop();
        const Type = DeduceType(Value);
        Executor.Environment.Define(Identifier, Executor.Memory.Allocate(Type, Value, IsConst));
    },

    ASSIGN: (Executor, Instruction) =>
    {
        const MemRef = Executor.Environment.Get(Instruction.ID);
        const Value = Executor.Stack.Pop();

        if(DeduceType(Value) != MemRef.PayloadType())
            Logger.RaiseException("Type mismatch")
        MemRef.SetValue(Value);
    },



    ADD: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        Executor.Stack.Push(LOperand + ROperand);
    },

    SUB: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        Executor.Stack.Push(LOperand - ROperand);
    },

    MUL: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        Executor.Stack.Push(LOperand * ROperand);
    },

    DIV: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        if(ROperand == 0)
            Logger.RaiseException("Division by zero");
        Executor.Stack.Push(LOperand / ROperand);
    },

    MOD: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        if(ROperand == 0)
            Logger.RaiseException("Division by zero");
        Executor.Stack.Push(LOperand % ROperand);
    },



    EQU: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        Executor.Stack.Push(LOperand === ROperand);
    },

    LT: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        Executor.Stack.Push(LOperand < ROperand);
    },

    GT: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        Executor.Stack.Push(LOperand > ROperand);
    },

    LTE: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        Executor.Stack.Push(LOperand <= ROperand);
    },

    GTE: (Executor, Instruction) =>
    {
        let ROperand = Executor.Stack.Pop();
        let LOperand = Executor.Stack.Pop();
        Executor.Stack.Push(LOperand >= ROperand);
    },   



    LABEL: (Executor, Instruction) =>
    {
        const Target = Executor.ProgramCounter.Counter + 1;
        Executor.LabelArray.Define(Instruction.ID, Target);
    },

    JUMP: (Executor, Instruction) =>
    {
        let Index = Instruction.TARGET;
        if(typeof Index == "string")
            Index = Executor.LabelArray.Resolve(Index);
        Executor.ProgramCounter.JumpTo(Index);
    },

    CJUMP: (Executor, Instruction) =>
    {
        if(Executor.Stack.Peek())
        {
            let Index = Instruction.TARGET;
            if(typeof Index == "string")
                Index = Executor.LabelArray.Resolve(Index);
            Executor.ProgramCounter.JumpTo(Index);
        }
        Executor.Stack.Pop();
    },


    PRINT: (Executor, Instruction) =>
    {
        console.log(Executor.Stack.Pop());
    },

    RAND: (Executor, Instruction) =>
    {
        Executor.Stack.Push(Math.random());
    },

    NOOP: (Executor, Instruction) =>
    {
    },
}