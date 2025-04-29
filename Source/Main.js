import { Logger } from "./Utils/Logger.js";
import { ExecutionEngine } from "./Engine/ExecutionEngine.js";

try
{
    const Executor = new ExecutionEngine();
    Executor.Execute("./Scripts/Strings.json");
}
catch(Error)
{
    Logger.Error(Error.message);
}
