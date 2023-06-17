import {IDateRange} from '../payload/common.interface';

export class CommonParam {
}

export class DateRangeParam implements IDateRange {
    endDate: string = '';
    startDate: string = '';
}

export class AmountRangeParam {
    minAmount: number = 0;
    maxAmount: number = 0;
    fixedAmount: number = 0;
    isRange: boolean = true;
}
