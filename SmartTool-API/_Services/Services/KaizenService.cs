using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API._Services.Interfaces;
using SmartTool_API.DTOs;
using SmartTool_API.Helpers;
using SmartTool_API.Models;
using SmartTooling_API._Repositories.Interfaces;

namespace SmartTool_API._Services.Services
{
    public class KaizenService : IKaizenService
    {

        private readonly IMapper _imapper;
        private readonly MapperConfiguration _mapperconfig;
        private readonly IKaizenRepository _ikaizenrepo;
        private readonly IModelRepository _modelRepository;
         private readonly IStageRepository _stageRepository;
        private readonly IFactoryRepository _factoryRepository;
        private readonly IModelOperationRepository _modelOperationRepository;
        private readonly IProcessTypeRepository _processTypeRepo;
        private OperationResult operationResult;

        public KaizenService(IMapper imapper, MapperConfiguration mapperconfig, IKaizenRepository ikaizenrepo,
                            IModelRepository modelRepository,
                             IStageRepository stageRepository = null,
                            IFactoryRepository factoryRepository = null, IModelOperationRepository modelOperationRepository = null, IProcessTypeRepository processTypeRepo = null)
        {
            _imapper = imapper;
            _mapperconfig = mapperconfig;
            _ikaizenrepo = ikaizenrepo;
            _modelRepository = modelRepository;
            _stageRepository = stageRepository;
            _factoryRepository = factoryRepository;
            _modelOperationRepository = modelOperationRepository;
            _processTypeRepo = processTypeRepo;
        }



        public Task<bool> Add(KaizenDTO model)
        {
            throw new System.NotImplementedException();
        }

        public async Task<OperationResult> addKaizen(KaizenDTO model)
        {
            if( await _ikaizenrepo.CheckKaizenDescriptionExist(model)){
                return operationResult = new OperationResult{ Caption = "Fail", Message = "This Kaizen Description is Exist", Success = false};
            }
            else
            {
                var models =_imapper.Map<Kaizen>(model);
                models.create_time = DateTime.Now;
                _ikaizenrepo.Add(models);
                await _ikaizenrepo.SaveAll();
                return operationResult = new OperationResult{ Caption = "Success", Message = "Add Kaizen Success", Success = true};
            }
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<KaizenDTO>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public KaizenDTO GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<object> getfactory(string factory)
        {
            var Model_no = await _modelRepository.FindAll(x=>x.factory_id ==factory && x.is_active ==true).ToListAsync();
            return Model_no.OrderByDescending(x=>x.prod_season).ThenByDescending(x=>x.volume);
        }

        public async Task<KaizenDTO> GetID(string modelNO)
        {
            var data = await _ikaizenrepo.FindAll(x => x.model_no == modelNO).OrderByDescending(x =>x.serial_no).ToListAsync();
            return _imapper.Map<List<KaizenDTO>>(data).FirstOrDefault();
        }

        public async Task<KaizenDTO> getKaizenEdit(string modelNO, string seriaNO, string factory)
        {
            var model = _modelOperationRepository.FindAll().Where(x=>x.factory_id==factory && x.model_no==modelNO);
            var kaizen = _ikaizenrepo.FindAll().Where(x=>x.factory_id==factory &&  x.model_no==modelNO && x.serial_no ==seriaNO.ToInt());

            var data = await (from a in kaizen
                            join b in model 
                            on new {Factory =a.factory_id,model_no =a.model_no,Stage = a.stage_id,opera =a.operation_id}
                        equals new {Factory =b.factory_id,model_no =b.model_no,Stage = b.stage_id,opera =b.operation_id}
                        select new KaizenDTO(){
                            factory_id = a.factory_id,
                            model_no = a.model_no,
                            serial_no = a.serial_no,
                            kaizen_description = a.kaizen_description,
                            stage_id = a.stage_id,
                            operation_id = a.operation_id,
                            start_date = a.start_date,
                            kaizen_type_eliminate = a.kaizen_type_eliminate,
                            kaizen_type_combine = a.kaizen_type_combine,
                            kaizen_type_reduce = a.kaizen_type_reduce,
                            kaizen_type_smart_tool = a.kaizen_type_smart_tool,
                            process_tct_sec = a.process_tct_sec,
                            ct_before_sec = a.ct_before_sec,
                            ct_after_sec = a.ct_after_sec,
                            rft_before_percent = a.rft_before_percent,
                            rft_after_percent = a.rft_after_percent,
                            line_roll_out_percent = a.line_roll_out_percent,
                            before_media = a.before_media,
                            after_media = a.after_media,
                            before_remarks = a.before_remarks,
                            after_remarks = a.after_remarks,
                            kaizen_from = a.kaizen_from,
                            clicks_times = a.clicks_times,
                            create_by = a.create_by,
                            update_by = a.update_by,
                            create_time = a.create_time,
                            update_time = a.update_time,
                            process = b.process_type_id
                        }).OrderBy(x=>x.serial_no).ToListAsync();
            return _imapper.Map<List<KaizenDTO>>(data).FirstOrDefault();
        }

        public async Task<object> getKaizenForm()
        {
            var kaizen = await _factoryRepository.FindAll().ToListAsync();
            return kaizen.OrderBy(x=>x.factory_id);
        }

        public async Task<object> getOpera(string model, string stage, string process, string factory)
        {
             var Opera =  _modelOperationRepository.FindAll(x=>x.factory_id ==factory);
             if (!String.IsNullOrEmpty(model))
            Opera = Opera.Where(x=>x.model_no == model); 
             if (!String.IsNullOrEmpty(stage))
            Opera = Opera.Where(x=>x.stage_id == stage);
            if (!String.IsNullOrEmpty(process))
            Opera = Opera.Where(x=>x.process_type_id == process);
            return await Opera.OrderBy(x=>x.sequence).ToListAsync();
        }

        public async Task<object> getProcess(string modelNO, string stage, string factory)
        {
            var Process =  _processTypeRepo.FindAll(x=>x.factory_id ==factory );
            var Opera = _modelOperationRepository.FindAll(x=>x.factory_id ==factory);
             if (!String.IsNullOrEmpty(modelNO))
            Opera = Opera.Where(x=>x.model_no == modelNO);
             if (!String.IsNullOrEmpty(stage))
            Opera = Opera.Where(x=>x.stage_id == stage);
            var data =  await (from a in Process
                        join b in Opera on new{Factory= a.factory_id,Process_id =a.process_type_id} equals new{Factory=b.factory_id,Process_id=b.process_type_id}
                        select new{
                            b.process_type_id,
                            a.process_type_name_en,
                            a.sequence
                        }).Distinct().OrderBy(x=>x.sequence).ToListAsync();
             return data;
        }

        public async Task<object> getStage(string factory)
        {
            var stages = await _stageRepository.FindAll(x=>x.factory_id ==factory && x.is_active ==true).ToListAsync();
            return stages.OrderBy(x=>x.sequence);

        }

        public Task<PagedList<KaizenDTO>> GetWithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<KaizenDTO>> Search(PaginationParams paginationParams, string model_no, string factory)
        {
            var model = _modelOperationRepository.FindAll().Where(x=>x.factory_id==factory);
            var Kaizen =  _ikaizenrepo.FindAll(x=>x.factory_id==factory);
            Kaizen = Kaizen.Where(x=>x.model_no ==model_no);

            var data = (from a in Kaizen
                        join b in model 
                        on new {Factory =a.factory_id,model_no =a.model_no,Stage = a.stage_id,opera =a.operation_id}
                 equals new {Factory =b.factory_id,model_no =b.model_no,Stage = b.stage_id,opera =b.operation_id}
                       select new KaizenDTO(){
                           factory_id = a.factory_id,
                           model_no = a.model_no,
                           serial_no = a.serial_no,
                           kaizen_description = a.kaizen_description,
                           stage_id = a.stage_id,
                           operation_id = a.operation_id,
                           start_date = a.start_date,
                           kaizen_type_eliminate = a.kaizen_type_eliminate,
                           kaizen_type_combine = a.kaizen_type_combine,
                           kaizen_type_reduce = a.kaizen_type_reduce,
                           kaizen_type_smart_tool = a.kaizen_type_smart_tool,
                           process_tct_sec = a.process_tct_sec,
                           ct_before_sec = a.ct_before_sec,
                           ct_after_sec = a.ct_after_sec,
                           rft_before_percent = a.rft_before_percent,
                           rft_after_percent = a.rft_after_percent,
                           line_roll_out_percent = a.line_roll_out_percent,
                           before_media = a.before_media,
                           after_media = a.after_media,
                           before_remarks = a.before_remarks,
                           after_remarks = a.after_remarks,
                           kaizen_from = a.kaizen_from,
                           clicks_times = a.clicks_times,
                           create_by = a.create_by,
                           update_by = a.update_by,
                           create_time = a.create_time,
                           update_time = a.update_time,
                           process = b.process_type_id
                       }).OrderBy(x=>x.serial_no);
                       return await PagedList<KaizenDTO>.CreateAsync(data, paginationParams.PageNumber, paginationParams.PageSize);
        }

        public Task<PagedList<KaizenDTO>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(KaizenDTO model)
        {
            throw new System.NotImplementedException();
        }

        public async Task<OperationResult> uppdateKaizen(KaizenDTO model)
        {
            if(await _ikaizenrepo.CheckKaizenDescriptionExist(model))
            {
                return operationResult = new OperationResult { Caption = "Fail", Message = "This Kaizen Description is Exist", Success = false };
            }else
            {
                model.update_time = DateTime.Now;
                var modelUp = _imapper.Map<Kaizen>(model);
                _ikaizenrepo.Update(modelUp);
                await _ikaizenrepo.SaveAll();
                return operationResult = new OperationResult { Caption = "Success", Message = "Update Kaizen Success", Success = true };
            }
        }
    }
}