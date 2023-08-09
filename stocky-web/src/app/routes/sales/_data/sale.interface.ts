export interface ComponentReportPreviewType {
    data?: ArrayBuffer;

    showControls: boolean;

    // previewType: ReportFilePreviewType;

    // dataType: ReportDataType;

    downloadAction: (arg?: any) => void;

    printAction: (arg?: any) => void;

    // closeAction: (arg?: any) => void;

}


