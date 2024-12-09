
using Microsoft.EntityFrameworkCore;


namespace Stock.Data
{
    [PrimaryKey(nameof(Email))]
    public class User 
    {
        public required string Email { get; set; }
        public required string Name { get; set; }
        public required string Password { get; set; }
        public ICollection<Stock>? FavoriteStocks { get; set; }
        public ICollection<StockHistory>? FavoriteHistories { get; set; }
        public ICollection<string>? NewsKeywords { get; set; }
    }
}
