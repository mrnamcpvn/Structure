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

        public Task<bool> Delete(object id)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<ModelOperationDTO>> GetWithPagination(PaginationParams param)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<ModelOperationDTO>> Search(PaginationParams param, object text)
        {
            throw new NotImplementedException();
        }

        public Task<OperationResult> AddAsync(ModelOperationDTO model)
        {
            throw new NotImplementedException();
        }
    }
}