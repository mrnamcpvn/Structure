export interface DefectReason {
    factory_id: string;
    defect_reason_id: string;
    defect_reason_name: string;
    sequence: number;
    is_active: boolean;
    update_by: string;
    update_time: Date;
}