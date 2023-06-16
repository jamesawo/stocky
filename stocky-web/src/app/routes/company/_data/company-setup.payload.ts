export class CompanySetupPayload {
    id?: number;
    setupKey?: string;
    setupValue?: string;

    constructor(key: string, value: string) {
        this.setupKey = key;
        this.setupValue = value;
    }
}


export class CompanyLocaleDetailsPayload {
    id?: number;

    currency?: string;
    language?: string;
    timeZone?: string;
}
