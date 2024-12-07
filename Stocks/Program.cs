using System.Globalization;
using System.Text.RegularExpressions;
using CsvHelper;
using CsvHelper.Configuration;
using Stock.Data;
using StocksDataImport;

public class Program
{
    public static void Main(string[] args)
    {
        var config = new CsvConfiguration(CultureInfo.CurrentCulture)
        {
            HasHeaderRecord = true,
        };

        foreach (string filePath in Directory.GetFiles(@"C:\Users\rybol\source\repos\Stock\Stocks\DataFiles"))
        {

            var stockName = GetFirstWord(Path.GetFileName(filePath));
            var ticker = GetTicker(stockName);

            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, config);


            try
            {
                csv.Context.RegisterClassMap<StockMap>();
                //2.27.2016 had bad data causing all import to fail. fixed now
                var records = csv.GetRecords<Stock.Data.Stock>().ToList();

                // Manually set Ticker and Name for each record
                foreach (var record in records)
                {
                    record.Name = stockName;
                    record.Ticker = ticker;
                }

                using var context = new StockContext();
                context.Stocks.AddRange(records);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                FileLogger.LogException(ex, stockName);
            }
        }

        VerfiyDataImport();
    }


    public static void VerfiyDataImport()
    {
        using (var context = new StockContext())
        {
            var stocks = context.Stocks.ToList();

            if (stocks.Any())
            {
                Console.WriteLine("Data successfully saved!");
                foreach (var stock in stocks.TakeLast(100))
                {
                    Console.WriteLine($"Ticker: {stock.Ticker}, Name: {stock.Name}, Date: {stock.Date}, Price: {stock.Price}");
                }
            }
            else
            {
                Console.WriteLine("No data found.");
            }
        }
    }

    public static string GetFirstWord(string input)
    {
        // Use a regular expression to match the first contiguous characters
        Match match = Regex.Match(input, @"^\w+");
        return match.Value;
    }

    public static string GetTicker(string stockName)
    {
        switch (stockName.ToLower()) {
            case "amazon":
                return "AMZN";
            case "apple":
                return "AAPL";
            case "nvidia":
                return "NVDA";
            default:
                return string.Empty;
        }
    }
}



   