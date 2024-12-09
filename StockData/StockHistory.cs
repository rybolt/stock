using System.Diagnostics.CodeAnalysis;

namespace Stock.Data
{
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
}
