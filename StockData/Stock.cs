namespace Stock.Data
{
    public class Stock
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Ticker { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public long Volume { get; set; }
        public decimal Change { get; set; }
    }

}
