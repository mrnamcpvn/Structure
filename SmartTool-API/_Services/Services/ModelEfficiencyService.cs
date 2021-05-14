using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    public class ModelEfficiencyService : IModelEfficiencyService
    {
        public ModelEfficiencyService(IEfficiencyRepository _RepoEff, IModelRepository _RemoModel, IMapper _Mapper, MapperConfiguration _ConfigMapper)
        {
            this._RepoEff = _RepoEff;
            this._RemoModel = _RemoModel;
            this._Mapper = _Mapper;
            this._ConfigMapper = _ConfigMapper;

        }
        public IEfficiencyRepository _RepoEff { get; set; }
        public IModelRepository _RemoModel { get; set; }
        public IMapper _Mapper { get; set; }
        public MapperConfiguration _ConfigMapper { get; set; }
        private string factory;
        public ModelEfficiencyService(IEfficiencyRepository repoEff, IModelRepository remoModel, IMapper mapper, MapperConfiguration configMapper, IConfiguration configuration)
        {
            _ConfigMapper = configMapper;
            _Mapper = mapper;
            _RemoModel = remoModel;
            _RepoEff = repoEff;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        public async Task<bool> CheckExist(ModelEfficiencyEditParam effParam)
        {
            return await _RepoEff.CheckExists(effParam);
        }

        public async Task<object> GetAllUpperID()
        {
            return await _RemoModel.FindAll(x => x.factory_id.Trim() == factory && x.is_active == true)
                                            .OrderBy(x => x.upper_id)
                                            .Select(x => new { x.upper_id }).Distinct().ToListAsync();
        }

        public async Task<object> GetModelName(string upperId, string factory)
        {
            return await _RemoModel.FindAll(x => x.factory_id.Trim() == factory &&
                                            x.upper_id.Trim() == upperId.Trim())
                                            .OrderBy(x => x.model_name)
                                            .Select(x => new { Name = x.model_name })
                                            .Distinct().ToListAsync();
        }

        public async Task<List<ModelEfficiencyDTO>> ModelEfficiencyEdit(ModelEfficiencyEditParam modelParam)
        {
            var pred_modelEff = PredicateBuilder.New<Efficiency>(true);
            if (!String.IsNullOrEmpty(modelParam.season))
            {
                pred_modelEff.And(x => x.factory_id.Trim() == factory && x.season.Contains(modelParam.season));
            }
            if (!String.IsNullOrEmpty(modelParam.upper_id))
            {
                pred_modelEff.And(x => x.factory_id.Trim() == factory && x.upper_id == modelParam.upper_id);
            }
            var list = await _RepoEff.FindAll(pred_modelEff).OrderBy(x => x.sequence).ToListAsync();
            var modelEfficiency = _Mapper.Map<List<ModelEfficiencyDTO>>(list);
            return modelEfficiency;
        }

        public async Task<bool> UpdateOrInsert(List<ModelEfficiencyDTO> modelEfficiencyDTO, string factory, string username)
        {
            foreach (var efficiency in modelEfficiencyDTO)
            {
                efficiency.season = efficiency.season + efficiency.season_year;
                var effParam = new ModelEfficiencyEditParam();
                effParam.factory = factory;
                effParam.season = efficiency.season;
                effParam.month = efficiency.month;
                effParam.upper_id = efficiency.upper_id;
                var modelEfficiency = _Mapper.Map<Efficiency>(efficiency);
                modelEfficiency.update_time = DateTime.Now;
                modelEfficiency.update_by = username;
                modelEfficiency.factory_id = factory;
                if (await CheckExist(effParam))
                {
                    _RepoEff.Update(modelEfficiency);
                }
                else
                {
                    modelEfficiency.create_time = DateTime.Now;
                    modelEfficiency.create_by = username;
                    _RepoEff.Add(modelEfficiency);
                }
            }

            return await _RepoEff.SaveAll();
        }
    }
}