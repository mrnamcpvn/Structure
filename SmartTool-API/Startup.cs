using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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
        public string factoryConnection;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            factoryConnection = configuration.GetSection("AppSettings:Factory").Value + "Connection";
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString(factoryConnection)));
            services.AddDbContext<SHCDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SHCConnection")));
            services.AddDbContext<CBDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("CBConnection")));
            services.AddDbContext<SPCDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SPCConnection")));
            services.AddDbContext<TSHDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("TSHConnection")));
            //AutoMapper
            services.AddAutoMapper(typeof(Startup));
            services.AddScoped<IMapper>(sp =>
              {
                  return new Mapper(AutoMapperConfig.RegisterMappings());
              });
            services.AddSingleton(AutoMapperConfig.RegisterMappings());
            //
            services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
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
            services.AddScoped<IKaizenBenefitsApplicationFormRepository, KaizenBenefitsApplicationFormRepository>();
            services.AddScoped<IViewModelKaizenRepository, ViewModelKaizenRepository>();
            services.AddScoped<IViewRFTAVGRepository, ViewRFTAVGRepository>();
            services.AddScoped<IViewRFTReportDetailRepository, ViewRFTReportDetailRepository>();

            //Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IModelService, ModelService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRFTService, RFTService>();
            services.AddScoped<IGroupKaizenReportService, GroupKaizenReportService>();
            services.AddScoped<IDefectReasonService, DefectReasonService>();
            services.AddScoped<IModelOperationService, ModelOperationService>();
            services.AddScoped<IModelEfficiencyService, ModelEfficiencyService>();
            services.AddScoped<IKaizenService, KaizenService>();
            services.AddScoped<ICrossSiteSharingService, CrossSiteSharingService>();
            services.AddScoped<IKaizenReportService, KaizenReportService>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
                        {
                            o.RequireHttpsMetadata = false;
                            o.SaveToken = true;
                            o.TokenValidationParameters = new TokenValidationParameters
                            {
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                                ValidateIssuer = false,
                                ValidateAudience = false
                            };
                        });
            services.AddSwaggerGen(c =>
               {
                   c.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartTool API", Version = "v1" });
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
