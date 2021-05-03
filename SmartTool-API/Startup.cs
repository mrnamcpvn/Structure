using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Repositories.Repositories;
using SmartTool_API._Services.Interfaces;
using SmartTool_API._Services.Services;
using SmartTool_API.Data;
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

            services.AddCors();

            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers().AddNewtonsoftJson(o =>
            {
                o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

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
            //Auto Mapper
            services.AddAutoMapper(typeof(Startup));
            services.AddScoped<IMapper>(sp => new Mapper(AutoMapperConfig.RegisterMappings()));
            services.AddSingleton(AutoMapperConfig.RegisterMappings());

            //Repository
            services.AddScoped<IModelRepository, ModelRepository>();
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
            services.AddScoped<IViewModelKaizenRepository, ViewModelKaizenRepository>();
            services.AddScoped<IKaizenBenefitsApplicationFormRepository, KaizenBenefitsApplicationFormRepository>();
            services.AddScoped<IViewRFTReportDetailRepository, ViewRFTReportDetailRepository>();
            services.AddScoped<IViewRFTAVGRepository, ViewRFTAVGRepository>();
            //Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IModelService, ModelService>();
            services.AddScoped<IRFTService, RFTService>();
            services.AddScoped<IDefectReasonService, DefectReasonService>();
            services.AddScoped<IModelOperationService, ModelOperationService>();
            services.AddScoped<IModelEfficiencyService, ModelEfficiencyService>();
            services.AddScoped<IKaizenService, KaizenService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IKaizenReportService, KaizenReportService>();
            services.AddScoped<IGroupKaizenReportService, GroupKaizenReportService>();
            services.AddScoped<IRFTReportService, RFTReportService>();
            services.AddScoped<ICrossSiteSharingService, CrossSiteSharingService>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartTool_API", Version = "v1" });
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
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SmartTool_API v1"));
            }
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwagger();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
