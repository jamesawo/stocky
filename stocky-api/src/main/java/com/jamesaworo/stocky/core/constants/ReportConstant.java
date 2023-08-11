/*
 * @Author: james.junior
 * @Date: 7/29/23 19:19
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.constants;

public class ReportConstant {
    public static final String EMPTY = "";
    public static final String NOT_AVAILABLE = "N/A";
    public static final String ERROR = "ERROR: ";
    public static final String CELL_ERROR = "Cell: [ %s ] - %s";
    public static final String CELL_EMPTY = "No value provided in the cell";
    public static final String ROW_EMPTY = "No value provided in the row";
    public static final String DONT_EXIST = " does not exist in our records";
    public static final String RECEIPT_DISCLAIMER = "GOODS BOUGHT IN GOOD CONDITION ARE NONRETURNABLE. THANK YOU FOR YOUR PATRONAGE";
    public static final String RECEIPT_FOOTER = "Powered by @Stocky | www.stocky-pos.com";
    public static final String SALES_REPORT_TITLE = "DAILY SALES COLLECTION REPORT";
    public static final String RECEIPT_NOT_FOUND = "Receipt not found, Invalid details supplied";
    public static final String REPORT_FILE_NAME = "inline; filename=\"Report.pdf\"";
    public static final String RECEIPT_FILE_NAME = "inline; filename=\"Receipt.pdf\"";
    public static final String PDF_CONTENT_TYPE = "application/pdf; charset=UTF-8";

    public static final String UNEXPECTED_FILE_TYPE = "Invalid file type provided, file must be %s";
}
