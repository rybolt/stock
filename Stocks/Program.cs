using System.Diagnostics;
using System.Globalization;
using System.Text.RegularExpressions;
using CsvHelper;
using CsvHelper.Configuration;
using Stock.Data;
using StocksDataImport;
using StocksDataImport.Model;

public partial class Program
{
    public static void Main(string[] args)
    {
        CreateUsers();
        //todo: if we want more data we need to improve to be able to take delta updates (ie. don't import duplicate data)
        //ImportStockData();
    }

    private static void CreateUsers()
    {
        using var context = new StockContext();
        //context.Users.Add(new User() { Email = "tigerShark@icloud.com", Name = "Tiger Wodz", NewsKeywords = ["Apple"] });
        //context.Users.Add(new User() { Email = "laLuna@gmail.com", Name = "Diego Luna", NewsKeywords = ["Nvidia"] });
        context.Users.Add(new User() { Email = "theOracle@omaha.com", Name = "Warren Buffet", NewsKeywords = ["Nvda", "Aapl","Amzn"], Password= "theOracle123" });
        context.SaveChanges();
    }

    private static void ImportStockData()
    {
        var config = new CsvConfiguration(CultureInfo.CurrentCulture)
        {
            HasHeaderRecord = true,
        };

        foreach (string filePath in Directory.GetFiles(@"C:\Users\rybol\source\repos\Stock\Stocks\DataFiles"))
        {

            var stockName = GetFirstWord(Path.GetFileName(filePath));

            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, config);

            try
            {

                var ticker = GetTicker(stockName);
                csv.Context.RegisterClassMap<StockRawDataMap>();

                //note: one bad record killed the whole import for that .csv
                //2.27.2016 had bad data causing all import to fail. fixed now

                var records = csv.GetRecords<StockImportData>().ToList();

                //sanity check
                Debug.Assert(records != null && records.Count > 0);

                using var context = new StockContext();

                // Manually set Ticker and Name for each record
                foreach (StockImportData record in records)
                {
                    var theStock = new Stock.Data.Stock
                    {
                        Name = stockName,
                        Ticker = ticker
                    };

                    context.Stocks.Add(theStock);
                    context.SaveChanges();

                    // Create a new stock history
                    StockHistory stockHistory = new(
                        theStock.StockId,
                        record.Date,
                        record.Price,
                        record.Open,
                        record.High,
                        record.Low,
                        record.Volume,
                        record.Change
                       )
                    {
                        Stock = theStock
                    };


                    // Add stock history to the context
                    context.StockHistories.Add(stockHistory);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                FileLogger.LogException(ex, stockName);
            }
        }
    }

    private static Regex StockNameRegEx { get; } = new Regex(@"^\w+");

    public static string GetFirstWord(string input)
    {
        // Use a regular expression to match the first contiguous characters
        Match match = StockNameRegEx.Match(input);
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
