using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stock.Data;
using StockApi.DataTransferModels;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowAll")]
public class StockController : ControllerBase
{
    private readonly StockContext _context;

    public StockController(StockContext context)
    {
        _context = context;
    }

    [HttpOptions("{ticker}")]
    public IActionResult Options()
    {
        return Ok();
    }

    [HttpGet("histories/{ticker}")]
    public async Task<IActionResult> GetStockHistories(string ticker, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)
    {
        if (string.IsNullOrWhiteSpace(ticker))
        {
            throw new ArgumentNullException(nameof(ticker));
        }

        //default to 3 months of data
        if (from == null)
        {
            from = DateTime.Now.AddMonths(-3);
        }

        if (to == null)
        {
            to = DateTime.Now;
        }

        var stockData = await _context.StockHistories
            .Where(s => s.Stock.Ticker == ticker && s.Date >= from && s.Date <= to)
            .Select(s => new StockGridData
            {
                Date = s.Date,
                Price = s.Price,
                Change = s.Change,
                High = s.High,
                Low = s.Low,
                Volume = s.Volume,
                Open = s.Open
            })
            .ToListAsync();

        if (stockData == null || !stockData.Any())
        {
            return NotFound("No stock data found for the given ticker and date range.");
        }

        return Ok(stockData);
    }
   


    [HttpGet("{ticker}")]
    public async Task<IActionResult> GetStockData(string ticker, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)
    {
        if (string.IsNullOrWhiteSpace(ticker))
        {
            throw new ArgumentNullException(nameof(ticker));
        }

        //default to 3 months of data
        if (from == null)
        {
            from = DateTime.Now.AddMonths(-3);
        }

        if (to == null)
        {
            to = DateTime.Now;
        }

        var stockData = await _context.StockHistories
            .Where(s => s.Stock.Ticker == ticker && s.Date >= from && s.Date <= to)
            .Select(s => new StockChartingData
            {
                Date = s.Date,
                Price = s.Price
            })
            .ToListAsync();

        if (stockData == null || !stockData.Any())
        {
            return NotFound("No stock data found for the given ticker and date range.");
        }

        return Ok(stockData);
    }
}
