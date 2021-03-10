using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
    public class ModelService : IModelService
    {
        private readonly IModelRepository _repo;

        private readonly IModelTypeRepository _repoModelType;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;

        private string factory;
        public ModelService(IModelRepository repo, 
                            IMapper mapper,
                            MapperConfiguration configMapper,
                            IModelTypeRepository repoModelType,
                            IConfiguration configuration)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repo = repo;
            _repoModelType = repoModelType;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        public async Task<PagedList<ModelDTO>> SearchModel(PaginationParams param, ModelParam modelParam)
        {
            var pred_Model = PredicateBuilder.New<Model>(true);
            bool active = true;
            if(!String.IsNullOrEmpty(modelParam.active) && modelParam.active != "all"){
                    if(modelParam.active == "0") {
                        active = false;
                    } 
                    pred_Model.And(x => x.is_active == active);
				}
			if(!String.IsNullOrEmpty(modelParam.model_search)) {
				pred_Model.And(x => x.model_no.Contains(modelParam.model_search) || x.model_name.Contains(modelParam.model_search));
			}
            var list = _repo.FindAll(pred_Model).ProjectTo<ModelDTO>(_configMapper).OrderByDescending(x => x.prod_season);
			return await PagedList<ModelDTO>.CreateAsync(list, param.PageNumber, param.PageSize);
        }
        public async Task<bool> Add(ModelDTO model)
        {
             var models = _mapper.Map<Model>(model);
             models.create_time = DateTime.Now;
            _repo.Add(models);
            return await _repo.SaveAll();
        }

        public async Task<object> GetModelType()
        {
            return await _repoModelType.FindAll(x => x.factory_id.Trim() == factory && x.is_active == true)
            .GroupBy(x => new { x.model_type_id, x.model_type_name })
            .Select(x => new {Id = x.Key.model_type_id, Name = x.Key.model_type_name}).ToListAsync();
        }

        public Task<bool> Delete(object id)
        {
            throw new NotImplementedException();
        }

        public Task<List<ModelDTO>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public ModelDTO GetById(object id)
        {
             var model =  _mapper.Map<Model, ModelDTO>(_repo.FindById(id));
             return model;
        }

        public Task<PagedList<ModelDTO>> GetWithPagination(PaginationParams param)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<ModelDTO>> Search(PaginationParams param, object text)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(ModelDTO model)
        {
            var modelUp = _mapper.Map<Model>(model);
            _repo.Update(modelUp);
            return await _repo.SaveAll();
        }

        public async Task<ModelDTO> GetByFactoryAndModelNo(string facID, string modelNo)
        {
            var model =  _mapper.Map<Model, ModelDTO>(await _repo.GetByFactoryAndModelNo(facID,modelNo));
             return model;
        }

    }
}