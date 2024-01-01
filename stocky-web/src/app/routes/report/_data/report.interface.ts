import {SalesReportTypeEnum} from "./reports.enum";

export interface SalesReportParams {
    startDate?: string;
    endDate?: string;
    reportType: SalesReportTypeEnum;
}
