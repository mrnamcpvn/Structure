using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public ModelService(IModelRepository repository, IModelRepository repo, IMapper mapper, IConfiguration configuration)
        {
            _mapper = mapper;
            _repo = repo;
            _configuration = configuration;
        }
        public Task<bool> Add(ModelDTO model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<ModelDTO>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }
        public async Task<object> GetAllModel()
        {
            var model = await _repo.FindAll(x => x.is_active).ToListAsync();
            return model;
        }

        public async Task<ModelDTO> GetByFactoryAndModelNo(string facID, string modelNo)
        {
            var model = _mapper.Map<Model, ModelDTO>(await _repo.GetByFactoryAndModelNo(facID, modelNo));
            return model;
        }
        public ModelDTO GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<object> GetModelType()
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<ModelDTO>> GetWithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<ModelDTO>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<ModelDTO>> SearchModel(PaginationParams param, ModelParam modelParam)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(ModelDTO model)
        {
            throw new System.NotImplementedException();
        }
    }
}