export interface Model {
    _id: string;
    factory_id: string;
    model_no: string;
    model_name: string;
    model_type_id: string;
    model_family: string;
    upper_id: string;
    dev_season: string;
    prod_season: string;
    volume: number | null;
    volume_percent: number | null;
    remarks: string;
    model_picture: string;
    is_active: boolean;
    create_by: string;
    create_time: string | Date;
    update_by: string;
    update_time: string | Date;
}