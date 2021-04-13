using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SmartTool_API.Data;
using SmartTool_API._Services.Interfaces;
using SmartTool_API._Services.Services;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Repositories.Repositories;
using Microsoft.AspNetCore.Http.Features;
using SmartTool_API.Helpers.AutoMapper;

namespace SmartTool_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddCors();

            //Auto Mapper
            services.AddAutoMapper(typeof(Startup));
            services.AddScoped<IMapper>(sp =>
            {
                return new Mapper(AutoMapperConfig.RegisterMappings());
            });
            services.AddSingleton(AutoMapperConfig.RegisterMappings());
            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //     .AddJwtBearer(options =>
            //     {
            //         options.RequireHttpsMetadata = false;
            //         options.SaveToken = true;
            //         options.TokenValidationParameters = new TokenValidationParameters
            //         {
            //             ValidateIssuerSigningKey = true,
            //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
            //             .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
            //             ValidateIssuer = false,
            //             ValidateAudience = false
            //         };
            //     });
            
            //repository
            services.AddScoped<IModelRepository, ModelRepository>();

            // //services
            services.AddScoped<IModelService, ModelService>();

            services.AddSwaggerGen(options =>
                {
                    options.SwaggerDoc("v2", new Microsoft.OpenApi.Models.OpenApiInfo
                    {
                        Title = "Place Info Service API",
                        Version = "v2",
                        Description = "Sample service for Learner",
                    });
                });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartTool_API", Version = "v1" });
                // c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                // {
                //     In = ParameterLocation.Header,
                //     Description = "Please insert JWT with Bearer into field",
                //     Name = "Authorization",
                //     Type = SecuritySchemeType.ApiKey
                // });
                // c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                //     {
                //         new OpenApiSecurityScheme
                //         {
                //         Reference = new OpenApiReference
                //         {
                //             Type = ReferenceType.SecurityScheme,
                //             Id = "Bearer"
                //         }
                //         },
                //         new string[] { }
                //         }
                //     });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // app.Use(async (context, next) =>
            // {
            //     context.Features.Get<IHttpMaxRequestBodySizeFeature>()
            //         .MaxRequestBodySize = null;

            //     await next.Invoke();
            // });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SmartTool_API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
