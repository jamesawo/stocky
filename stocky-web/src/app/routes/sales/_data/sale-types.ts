export type ReceiptViewType = {
    receiptUrl: string,
    data: ArrayBuffer,
    downloadAction: (args?: any) => void,
    printAction: (args?: any) => void,
    closeAction: (args?: any) => void,
}
