import { Logger } from "./Utils/Logger.js";
import { ExecutionEngine } from "./Engine/ExecutionEngine.js";

try
{
    const Executor = new ExecutionEngine();
    Executor.Execute("./Scripts/Loop.json");
}
catch(Error)
{
    Logger.Error(Error.message);
}
