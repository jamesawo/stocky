package com.jamesaworo.stocky.features.sale.data.enums;

import com.jamesaworo.stocky.core.utils.ExportUtil;

import java.io.InputStream;

public enum SaleReportFileEnum {

    SALE_RECEIPT {
        final String name = "/payment_receipt";

        @Override
        public InputStream asInputStream() {
            return ExportUtil.getFileFromClassPathAsInputStream(SRC + name + EXT);
        }
    };

    public static final String SRC = "/report/sales";
    public static final String EXT = ".jrxml";

    public abstract InputStream asInputStream();
}
