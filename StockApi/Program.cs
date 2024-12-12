
using Microsoft.EntityFrameworkCore;
using Stock.Data;
using System.Text;

namespace StockApi
{

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add EF DbContext
            builder.Services.AddDbContext<StockContext>();

            // Add services to the container.

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                  builder => builder.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  );
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseRouting();
            app.UseCors("AllowAll");

            // Basic Authentication with EF  [must come after CORS]
            app.Use(async (context, next) =>
            {
                //note: this will do for now, but later we will add => JWT (JSON Web Token) or similar token mechanisms.

                var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
                if (authHeader is null || !authHeader.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
                {
                    context.Response.StatusCode = 401; // Unauthorized
                    context.Response.Headers["WWW-Authenticate"] = "Basic realm=\"API\"";
                    return;
                }

                var token = authHeader.Substring("Basic ".Length).Trim();
                var credentials = Encoding.UTF8.GetString(Convert.FromBase64String(token)).Split(':');
                if (credentials.Length != 2)
                {
                    context.Response.StatusCode = 401; // Unauthorized
                    context.Response.Headers["WWW-Authenticate"] = "Basic realm=\"API\"";
                    return;
                }

                var username = credentials[0];
                var password = credentials[1];

                using var scope = app.Services.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<StockContext>();

                // Validate credentials against the database
                var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Email == username && u.Password == password);

                if (user == null)
                {
                    context.Response.StatusCode = 401; // Unauthorized
                    context.Response.Headers["WWW-Authenticate"] = "Basic realm=\"API\"";
                    return;
                }

                // Credentials validated, proceed to the next middleware
                await next(context);
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

       

            // Example endpoint
            app.MapGet("/", () => "Hello, authenticated user!");
            app.MapControllers();

            app.Run();
        }
    }
}
