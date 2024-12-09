using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
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
}
