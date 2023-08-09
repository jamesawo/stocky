export enum ModalOrDrawer {
    MODAL = 'modal',
    DRAWER = 'drawer',
    ANY = 'any'
}

export enum AppModuleEnum {
    AUTHENTICATION = 'AUTHENTICATION',
    COMPANY = 'COMPANY',
    PRODUCT = 'PRODUCT',
    STOCK = 'STOCK',
    REPORT = 'REPORT',
    SETTING = 'SETTING',
    SALE = 'SALE',
    PAYWALL = 'PAYWALL',
}

export enum TableButtonEnum {
    EDIT = 'edit',
    DELETE = 'delete',
    TOGGLE_STATUS = 'status'
}

export enum CustomerTagEnum {
    ROOKIE = 'ROOKIE',
    PREMIUM = 'PREMIUM',
    VIP = 'VIP'
}

export enum NokRelationship {
    FATHER = 'FATHER',
    MOTHER = 'MOTHER',
    SISTER = 'SISTER',
    BROTHER = 'BROTHER',
    WIFE = 'WIFE',
    HUSBAND = 'HUSBAND',
    CHILD = 'CHILD',
    OTHER = 'OTHER',
}

export enum SettingModuleEnum {
    BACKUP = 'BACKUP',
    DASHBOARD = 'DASHBOARD',
    EXPENSES = 'EXPENSES',
    NOTIFICATION = 'NOTIFICATION',
    PAYMENT_METHOD = 'PAYMENT_METHOD',
    PEOPLE = 'PEOPLE',
    PRODUCT = 'PRODUCT',
    SALES = 'SALES',
    STOCK = 'STOCK',
    COMPANY = 'COMPANY',
    TAX = 'TAX',
}

export enum ReportFilePreviewType {
    IFRAME,
    OBJECT
}

export enum ReportDataType {
    ARRAY_BUFFER,
    FILE_URL
}

export enum FileType {
    PDF = 'pdf',
    EXCEL = 'xls',
    CSV = 'csv',
    TXT = 'txt',
    WORD = 'doc',
    DOCX = 'docx',
    JPG = 'jpg',
    PNG = 'png',
}

export enum FileTemplate {
    PRODUCT_UPLOAD_TEMPLATE_XLS = 'ProductTemplate.xls',
    TRANSACTION_RECEIPT_PDF = 'Receipt.pdf',
}

export enum FileExtensions {
    EXCEL = '.xlsx',
    CSV = '.csv',
    TXT = '.txt',
    PDF = '.pdf',
    DOC = '.doc',
    DOCX = '.docx',
    JPG = '.jpg',
    PNG = '.png'
}
