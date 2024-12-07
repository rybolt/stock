using System;
using System.IO;


public static class FileLogger
{
    private static readonly string logFilePath = @"C:\\Users\\rybol\\source\\repos\\Stock\\error_log.txt";

    public static void LogException(Exception e, string identifier)
    {
        using StreamWriter writer = new(logFilePath, true);
        writer.WriteLine(identifier);
        writer.WriteLine("Date: " + DateTime.Now.ToString());
        writer.WriteLine("Message: " + e.Message);
        writer.WriteLine("StackTrace: " + e.StackTrace);
        writer.WriteLine("Source: " + e.Source);
        writer.WriteLine("TargetSite: " + e.TargetSite);
        writer.WriteLine(new string('-', 80));
    }
}
