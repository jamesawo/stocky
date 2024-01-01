import {Component} from '@angular/core';
import {SalesReportTypeEnum} from "../_data/reports.enum";
import {firstValueFrom} from "rxjs";
import {ReportUsecase} from "../_usecase/report.usecase";
import {SalesReportParams} from "../_data/report.interface";

@Component({
    selector: 'app-report-sales',
    templateUrl: './report-sales.component.html',
    styles: []
})
export class ReportSalesComponent {
    public selectedReportType = SalesReportTypeEnum.SUMMARIZED;
    public readonly salesReportTypeEnum = SalesReportTypeEnum;
    public startDate?: string;
    public endDate?: string;
    public isLoading = false;

    public isInvalidStartDate = false;
    public isInvalidEndDate = false;
    public reportData: any;

    constructor(private reportUsecase: ReportUsecase) {
    }


    public onReportTypeChange(value: SalesReportTypeEnum) {
        if (value) this.selectedReportType = value;
    }

    public onDateSelected(date: string, type: 'start' | 'end') {
        if (date) {
            if (type === 'start') this.startDate = date;

            if (type === 'end') this.endDate = date;
        }
    }

    public async onGetSalesReport() {

        const validationResult = this.validateParams();
        if (!validationResult.status) {
            return;
        }
        this.isLoading = true;
        const params: SalesReportParams = {
            reportType: this.selectedReportType,
            endDate: this.endDate,
            startDate: this.startDate
        };
        const data = await firstValueFrom(this.reportUsecase.salesReport(params));
        this.isLoading = false;
        this.displayReportData(data);
    }

    private validateParams(): { status: boolean, message: string } {

        let result = {status: true, message: ''};

        if (!this.startDate) {
            this.isInvalidStartDate = true;
            result.message = 'provide a valid start date';
            result.status = false;
        } else {
            this.isInvalidStartDate = false;
        }

        if (!this.endDate) {
            this.isInvalidEndDate = true;
            result.message = 'provide a valid end date';
            result.status = false;
        } else {
            this.isInvalidEndDate = false;
        }

        return result;
    }

    private displayReportData(data: ArrayBuffer) {
        this.reportData = data;
        this.isLoading = false;
    }
}
