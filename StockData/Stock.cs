using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Stock.Data
{
    public class Stock
    {
        public int StockId { get; set; }
        public required string Name { get; set; }
        public required string Ticker { get; set; }
        public ICollection<User>? Users { get; set; }
        public ICollection<StockHistory>? StockHistories { get; set; }
    }

    
    public class StockHistory
    {
        [SetsRequiredMembers]
        public StockHistory(int stockId, DateTime date, decimal price, decimal open, decimal high, decimal low, long volume, decimal change)
        {
            StockId = stockId;
            Date = date;
            Price = price;
            Open = open;
            High = high;
            Low = low;
            Volume = volume;
            Change = change;
        }


        public int StockHistoryId { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public long Volume { get; set; }
        public decimal Change { get; set; }
        public int StockId { get; set; } // Foreign key
        //this was marked 'required' but EF had issues with using migrations binding a nav. property in a ctor.
        public Stock? Stock { get; set; } // Navigation property
        public ICollection<User>? Users { get; set; }
    }

    [PrimaryKey(nameof(Email))]
    public class User
    {
        public required string Email { get; set; }
        public required string Name { get; set; }
        public ICollection<Stock>? FavoriteStocks { get; set; }
        public ICollection<StockHistory>? FavoriteHistories { get; set; }
        public ICollection<string>? NewsKeywords { get; set; }
    }
}
