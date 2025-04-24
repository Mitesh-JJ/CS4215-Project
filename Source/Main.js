import { Logger } from "./Utils/Logger.js";
import { ExecutionEngine } from "./Engine/ExecutionEngine.js";

try
{
    const Engine = new ExecutionEngine();

    const Program =
    [
        {
            OpCode: "LOADC",
            Value: 21.01
        },
        {
            OpCode: "ASSIGN",
            Identifier: "Var"
        },
        {
            OpCode: "POP"
        },
        {
            OpCode: "LOAD",
            Identifier: "Var"
        },
        {
            OpCode: "PRINT"
        }
    ]

    for(let i = 0; i < Program.length; i++)
        Engine.Execute(Program[i]);
}
catch(Error)
{
    Logger.Error(Error.message);
}
