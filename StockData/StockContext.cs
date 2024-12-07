using Microsoft.EntityFrameworkCore;

namespace Stock.Data
{
    public class StockContext : DbContext
    {
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<StockHistory> StockHistories { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=StockData;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Stock>()
                .HasMany(s => s.StockHistories)
                .WithOne(sh => sh.Stock)
                .HasForeignKey(sh => sh.StockId);

            //note: .net core EF will create bridge tables on the database side of things
            modelBuilder.Entity<User>()
                .HasMany(u => u.FavoriteStocks)
                .WithMany(s => s.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserStock",
                    j => j.HasOne<Stock>().WithMany().HasForeignKey("StockId"),
                    j => j.HasOne<User>().WithMany().HasForeignKey("UserId"));

            modelBuilder.Entity<User>()
                .HasMany(u => u.FavoriteHistories)
                .WithMany(sh => sh.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserStockHistory",
                    j => j.HasOne<StockHistory>().WithMany().HasForeignKey("StockHistoryId"),
                    j => j.HasOne<User>().WithMany().HasForeignKey("UserId"));
        }
    }


}
