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
        private OperationResult operationResult;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;

        public ModelService(IModelRepository modelRepository, IUnitOfWork unitOfWork, IMapper mapper, MapperConfiguration configMapper)
        {
            _modelRepository = modelRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
        }

        public async Task<List<ModelDTO>> GetAllAsync()
        {
            return await _modelRepository.FindAll().ProjectTo<ModelDTO>(_configMapper).ToListAsync();
        }

        public async Task<OperationResult> AddAsync(ModelDTO model)
        {
            var item = _mapper.Map<Model>(model);
            try
            {
                await _modelRepository.AddAsync(item);
                await _modelRepository.SaveAll();

                // await _unitOfWork.SaveChangeAsync();

                operationResult = new OperationResult() { Caption = "Success", Message = "Save Complete", Success = true, Data = item };
            }
            catch (Exception ex)
            {
                operationResult = new OperationResult() { Caption = "Failed", Message = ex.Message.ToString(), Success = false };
            }

            return operationResult;
        }
        public ModelDTO GetById(object id)
        {
            throw new NotImplementedException();
        }

        public Task<Pager> PaginationAsync(ParamaterPagination paramater)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(ModelDTO model)
        {
            var modelUp = _mapper.Map<Model>(model);
            _modelRepository.Update(modelUp);
            return await _modelRepository.SaveAll();
        }

        public Task<bool> Delete(object id)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<ModelDTO>> GetWithPagination(PaginationParams param)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<ModelDTO>> Search(PaginationParams param, object text)
        {
            throw new NotImplementedException();
        }

        public async Task<ModelDTO> GetByFactoryAndModelNo(string facID, string modelNo)
        {
            var model =  _mapper.Map<Model, ModelDTO>(await _modelRepository.GetByFactoryAndModelNo(facID,modelNo));
             return model;
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
            var list = _modelRepository.FindAll(pred_Model).ProjectTo<ModelDTO>(_configMapper).OrderByDescending(x => x.prod_season);
			return await PagedList<ModelDTO>.CreateAsync(list, param.PageNumber, param.PageSize);
        }

        public async Task<bool> Delete(ModelOperationDTO operation)
        {
                var modelOperation = _mapper.Map<Model_Operation>(operation);
                _modelRepository.Remove(modelOperation);
                return await _modelRepository.SaveAll();
        }
    }
}