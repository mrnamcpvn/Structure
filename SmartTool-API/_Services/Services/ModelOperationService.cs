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
using SmartTool_API._Repositories.Repositories;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTO;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Services.Services
{
    public class ModelOperationService : IModelOperationService
    {
        private readonly IModelOperationRepository _modelOperationRepository;
        private OperationResult operationResult;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;

        public ModelOperationService(IModelOperationRepository modelOperationRepository, IMapper mapper, MapperConfiguration configMapper)
        {
            _modelOperationRepository = modelOperationRepository;
            _mapper = mapper;
            _configMapper = configMapper;
        }

        public async Task<List<ModelOperationDTO>> GetAllAsync()
        {
            return await _modelOperationRepository.FindAll().ProjectTo<ModelOperationDTO>(_configMapper).ToListAsync();
        }
        public ModelOperationDTO GetById(object id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(ModelOperationDTO model)
        {
            throw new NotImplementedException();
        }

        public async Task<OperationResult> Delete(ModelOperationDTO modelOperationDTO)
        {
            var modelOperation =  _mapper.Map<Model_Operation>(modelOperationDTO);
            _modelOperationRepository.Remove(modelOperation);
            try
            {
                await _modelOperationRepository.SaveAll();
                return new OperationResult {Success = true, Caption = "Model operation was successfully delete."};
            }
            catch
            {
                return new OperationResult {Success = true, Caption = "Deleting model operation failed on save."};
            }
        }

        public Task<PagedList<ModelOperationDTO>> GetWithPagination(PaginationParams param)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<ModelOperationDTO>> Search(PaginationParams param, object text)
        {
            throw new NotImplementedException();
        }

        public async Task<OperationResult> AddAsync(ModelOperationDTO modelOperationDTO)
        {
            var item = _mapper.Map<Model_Operation>(modelOperationDTO);
            try
            {
                await _modelOperationRepository.AddAsync(item);
                await _modelOperationRepository.SaveAll();

                // await _unitOfWork.SaveChangeAsync();

                operationResult = new OperationResult() { Caption = "Success", Message = "Save Complete", Success = true, Data = item };
            }
            catch (Exception ex)
            {
                operationResult = new OperationResult() { Caption = "Failed", Message = ex.Message.ToString(), Success = false };
            }

            return operationResult;
        }

        public Task<PagedList<ModelDTO>> SearchModel(PaginationParams param, ModelParam modelParam)
        {
            throw new NotImplementedException();
        }

        public async Task<ModelOperationDTO> GetModelOperation(ModelOperationEditParam modelOperationEditParam)
        {
            var data = await _modelOperationRepository.GetByModelOperation(modelOperationEditParam);
            var models = _mapper.Map<Model_Operation, ModelOperationDTO>(data);
            return models;
        }
    }
}