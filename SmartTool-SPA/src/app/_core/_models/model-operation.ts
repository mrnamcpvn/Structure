export interface ModelOperation {
    _id: string;
    factory_id: string;
    model_no: string;
    stage_id: string;
    operation_id: string;
    process_type_id: string;
    process_type_name: string;
    operation_name_local: string;
    operation_name_en: string;
    operation_name_zh: string;
    sop_no: string;
    critical_quality: boolean;
    critical_efficiency: boolean;
    sequence: number;
    create_by: string;
    create_time: string | Date;
    update_by: string;
    update_time: string | Date;
}