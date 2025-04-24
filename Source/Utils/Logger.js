export class Logger
{
    static RaiseException(Message)
    {
        throw new Error(Message);
    }

    static Info(Message)
    {
        console.log("[INFO] " + Message);
    }

    static Warn(Message)
    {
        console.warn("[WARN] " + Message);
    }

    static Error(Message)
    {
        console.error("[ERROR] " + Message);
    }
}