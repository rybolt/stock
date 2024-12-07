using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;

namespace StocksDataImport.Model
{
    /// <summary>
    /// need to map to an intermediate data structure to get flat data from .csv
    /// </summary>
    public class StockImportData
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public long Volume { get; set; }
        public decimal Change { get; set; }
    }

    public class StockRawDataMap : ClassMap<StockImportData>
    {
        public StockRawDataMap()
        {
            Map(m => m.Date).Name("Date");
            Map(m => m.Price).Name("Price");
            Map(m => m.Open).Name("Open");
            Map(m => m.High).Name("High");
            Map(m => m.Low).Name("Low");
            Map(m => m.Volume).Name("Vol.")
                .TypeConverter<VolumeConverter>();
            Map(m => m.Change).Name("Change %")
                .TypeConverter<ChangeConverter>();
            Map(m => m.Id).Ignore();
        }

        private long ConvertVolume(string volumeString)
        {
            if (volumeString.EndsWith("M"))
            {
                return (long)(decimal.Parse(volumeString.TrimEnd('M')) * 1_000_000);
            }
            else if (volumeString.EndsWith("K"))
            {
                return (long)(decimal.Parse(volumeString.TrimEnd('K')) * 1_000);
            }
            else
            {
                return long.Parse(volumeString);
            }
        }
    }

    public class VolumeConverter : DefaultTypeConverter
    {
        public override object ConvertFromString(
            string text,
            IReaderRow row,
            MemberMapData memberMapData)
        {
            try
            {
                if (string.IsNullOrEmpty(text))
                    return 0;

                if (text.EndsWith("B")) 
                {
                    return (long)(decimal.Parse(text.TrimEnd('B')) * 1_000_000_000);
                }

                if (text.EndsWith("M"))
                {
                    return (long)(decimal.Parse(text.TrimEnd('M')) * 1_000_000);
                }
                else if (text.EndsWith("K"))
                {
                    return (long)(decimal.Parse(text.TrimEnd('K')) * 1_000);
                }
                else
                {
                    return long.Parse(text);
                }
            }
            catch (Exception) { return 0; } //sry, data just for practice UI
        }
    }

    public class ChangeConverter : DefaultTypeConverter
    {
        public override object ConvertFromString(string text, IReaderRow row, MemberMapData memberMapData)
        {
            try
            {
                if (string.IsNullOrEmpty(text))
                    return 0;

                if (text.EndsWith("%"))
                {
                    return decimal.Parse(text.TrimEnd('%')) / 100;
                }
                else
                {
                    return decimal.Parse(text);
                }
            }
            catch (Exception) { return 0m; } //sry, data just for practice UI
        }
    }


}
