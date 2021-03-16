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
        private readonly IModelRepository _modelRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IModelTypeRepository _modelTypeRepository;
        private OperationResult operationResult;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private string factory;

        public ModelService(IModelRepository modelRepository, IUnitOfWork unitOfWork, IModelTypeRepository modelTypeRepository, IMapper mapper, MapperConfiguration configMapper, IConfiguration configuration)
        {
            _modelRepository = modelRepository;
            _unitOfWork = unitOfWork;
            _modelTypeRepository = modelTypeRepository;
            _mapper = mapper;
            _configMapper = configMapper;
            factory = configuration.GetSection("AppSettings:Factory").Value;
        }

        public async Task<List<ModelDTO>> GetAllAsync()
        {
            return await _modelRepository.FindAll().ProjectTo<ModelDTO>(_configMapper).ToListAsync();
        }

        public async Task<OperationResult> AddAsync(ModelDTO model)
        {
            model.create_time = DateTime.Now;
            model.update_time = DateTime.Now;
            var item = _mapper.Map<Model>(model);
            _modelRepository.Add(item);
            try
            {
                await _modelRepository.SaveAll();
                return new OperationResult() { Caption = "Success", Message = "Save Complete", Success = true, Data = item };
            }
            catch (Exception ex)
            {
                return new OperationResult() { Caption = "Failed", Message = ex.Message.ToString(), Success = false };
            }
        }
        public ModelDTO GetById(object id)
        {
            throw new NotImplementedException();
        }

        public Task<Pager> PaginationAsync(ParamaterPagination paramater)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(ModelDTO modelDTO)
        {
            var modelUp = _mapper.Map<Model>(modelDTO);
            _modelRepository.Update(modelUp);
            return await _modelRepository.SaveAll();
        }

        public Task<PagedList<ModelDTO>> GetWithPagination(PaginationParams param)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<ModelDTO>> Search(PaginationParams param, object text)
        {
            throw new NotImplementedException();
        }

        public async Task<ModelDTO> GetByModelNo(string modelNo)
        {
            var model = _mapper.Map<Model, ModelDTO>(await _modelRepository.GetByModelNo(modelNo));
            return model;
        }

        public async Task<PagedList<ModelDTO>> SearchModel(PaginationParams param, ModelParam modelParam)
        {
            var pred_Model = PredicateBuilder.New<Model>(true);
            bool active = true;
            if (!String.IsNullOrEmpty(modelParam.active) && modelParam.active != "all")
            {
                if (modelParam.active == "0")
                {
                    active = false;
                }
                pred_Model.And(x => x.is_active == active);
            }
            if (!String.IsNullOrEmpty(modelParam.model_search))
            {
                pred_Model.And(x => x.model_no.Contains(modelParam.model_search) || x.model_name.Contains(modelParam.model_search));
            }
            var list = _modelRepository.FindAll(pred_Model).ProjectTo<ModelDTO>(_configMapper).OrderByDescending(x => x.prod_season);
            return await PagedList<ModelDTO>.CreateAsync(list, param.PageNumber, param.PageSize);
        }

        public async Task<OperationResult> Delete(ModelDTO modelDTO)
        {
            var model = _mapper.Map<Model>(modelDTO);
            _modelRepository.Remove(model);
            try
            {
                await _modelRepository.SaveAll();
                return new OperationResult { Success = true, Caption = "Model was successfully delete." };
            }
            catch (System.Exception)
            {
                return new OperationResult { Success = false, Caption = "Deleting model failed on save." };
            }
        }

        public async Task<object> GetModelType()
        {
            return await _modelTypeRepository.FindAll(x => x.factory_id.Trim() == factory && x.is_active == true)
            .GroupBy(x => new { x.model_type_id, x.model_type_name })
            .Select(x => new { Id = x.Key.model_type_id, Name = x.Key.model_type_name }).ToListAsync();
        }
    }
}