namespace StockApi.DataTransferModels
{
    public class StockGridData
    {
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Change { get; set; }
        public decimal Open { get; set; }
        public long Volume { get; set; }

    }

}
