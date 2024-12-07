using Microsoft.EntityFrameworkCore;

namespace Stock.Data
{
    public class StockContext : DbContext
    {
        public DbSet<Stock> Stocks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Data Source=.\\SQLExpress;Initial Catalog=StockData;Integrated Security=SSPI;");
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=StockData;Trusted_Connection=True;");
        }

       

    }

}
