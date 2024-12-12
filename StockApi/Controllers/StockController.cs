﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StockApi.DataTransferModels;
using Stock.Data;
using Microsoft.AspNetCore.Cors;

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

    [HttpGet("{ticker}")]
    public async Task<IActionResult> GetStockData(string ticker, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)
    {
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
