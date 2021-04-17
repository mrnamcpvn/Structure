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
using SmartTooling_API._Services.Services;
using SmartTooling_API._Services.Interfaces;
using SmartTooling_API._Repositories.Repositories;
using SmartTooling_API._Repositories.Interfaces;
using SmartTooling_API.Helpers.AutoMapper;
using SmartTooling_API.Data;
using Microsoft.AspNetCore.Http.Features;

namespace SmartTool_API
{
    public class Startup
    {
        private string factoryConnection;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            factoryConnection = configuration.GetSection("AppSettings:Factory").Value + "Connection";
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string a =factoryConnection;
            services.AddCors();
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            // services.AddDbContext<SHCDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SHCConnection")));
            // services.AddDbContext<CBDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("CBConnection")));
            // services.AddDbContext<SPCDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SPCConnection")));
            // services.AddDbContext<TSHDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("TSHConnection")));
            services.AddControllers().AddNewtonsoftJson();
            //Auto Mapper
            services.AddAutoMapper(typeof(Startup));
            services.AddScoped<IMapper>(sp =>
            {
                return new Mapper(AutoMapperConfig.RegisterMappings());
            });
            services.AddSingleton(AutoMapperConfig.RegisterMappings());
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                        .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });


            //Repository
            services.AddScoped<IModelRepository, ModelRepository>();
            services.AddScoped<IViewModelKaizenRepository, ViewModelKaizenRepository>();
            services.AddScoped<IModelTypeRepository, ModelTypeRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IRoleUserRepository, RoleUserRepository>();
            services.AddScoped<IEfficiencyRepository, EfficiencyRepository>();
            services.AddScoped<IKaizenRepository, KaizenRepository>();
            services.AddScoped<IModelOperationRepository, ModelOperationRepository>();
            services.AddScoped<IFactoryRepository, FactoryRepository>();
            services.AddScoped<IDefectReasonRepository, DefectReasonRepository>();
            services.AddScoped<IMeasurement_RFTRepository, Measurement_RFTRepository>();
            services.AddScoped<IStageRepository, StageRepository>();
            services.AddScoped<IProcessTypeRepository, ProcessTypeRepository>();
            services.AddScoped<IViewRFTReportDetailRepository, ViewRFTReportDetailRepository>();
            services.AddScoped<IViewRFTAVGRepository, ViewRFTAVGRepository>();
            services.AddScoped<IKaizenBenefitsApplicationFormRepository, KaizenBenefitsApplicationFormRepository>();

            //Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IModelService, ModelService>();
            services.AddScoped<IKaizenReportService, KaizenReportService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRFTService, RFTService>();
            services.AddScoped<IGroupKaizenReportService, GroupKaizenReportService>();
            services.AddScoped<IDefectReasonService, DefectReasonService>();
            services.AddScoped<IModelOperationService, ModelOperationService>();
            services.AddScoped<IModelEfficiencyService, ModelEfficiencyService>();
            services.AddScoped<IRFTReportService, RFTReportService>();
            services.AddScoped<IKaizenService, KaizenService>();
            services.AddScoped<ICrossSiteSharingService, CrossSiteSharingService>();

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartTooling API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme
                        {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                        },
                        new string[] { }
                        }
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use(async (context, next) =>
            {
                context.Features.Get<IHttpMaxRequestBodySizeFeature>()
                    .MaxRequestBodySize = null;

                await next.Invoke();
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseHttpsRedirection();
            app.UseRouting();
            // app.UseCors ("CorsPolicy");
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "SmartTooling API V1");
            });

        }
    }
}
