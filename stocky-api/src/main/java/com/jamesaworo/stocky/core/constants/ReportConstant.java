/*
 * @Author: james.junior
 * @Date: 7/29/23 19:19
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.constants;

public class ReportConstant {
    public static final String EMPTY = "";
    public static final String WALK_IN = "WalkIn Customer";
    public static final String SPACE = " ";
    public static final String DASHES = "---";
    public static final String RECEIPT_PREFIX = "RCP";
    public static final String NOT_AVAILABLE = "N/A";
    public static final String SCRAP_ERROR = "Error on row %s / cell %s: ";
    public static final String CELL_EMPTY = "No value provided in the cell";
    public static final String PRD = "Product";
    public static final String TOTAL_COUNT = "TOTAL COUNT";
    public static final String SUCCESS_COUNT = "SUCCESS COUNT";
    public static final String FAILED_COUNT = "FAILED COUNT";
    public static final String STATS_COUNT = "STATS COUNT";
    public static final String GENERIC_EXISTS = "%s with the same %s already exists ( %s )";
    public static final String NO_CATEGORY_EXISTS = "No product category with this name ( %s ) exists";
    public static final String ROW_EMPTY = "No value provided in the row";
    public static final String DONT_EXIST = " does not exist in our records";
    public static final String RECEIPT_DISCLAIMER = "All purchased items are nonreturnable, Thank you for your business!";
    public static final String RECEIPT_FOOTER = "";
    public static final String SALES_REPORT_TITLE = "DAILY SALES COLLECTION REPORT";
    public static final String SALES_SUMMARIZED_REPORT_TITLE = "SUMMARIZED SALES COLLECTION REPORT";
    public static final String SALES_DETAILED_REPORT_TITLE = "DETAILED SALES COLLECTION REPORT";
    public static final String RECEIPT_NOT_FOUND = "Receipt not found, Invalid details supplied";
    public static final String REPORT_FILE_NAME = "inline; filename=\"Report.pdf\"";
    public static final String RECEIPT_FILE_NAME = "inline; filename=\"Receipt.pdf\"";
    public static final String PDF_CONTENT_TYPE = "application/pdf; charset=UTF-8";

    public static final String UNEXPECTED_FILE_TYPE = "Invalid file type provided, file must be %s";
}
