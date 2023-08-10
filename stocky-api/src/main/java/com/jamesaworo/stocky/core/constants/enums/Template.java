package com.jamesaworo.stocky.core.constants.enums;

public enum Template {
    PRODUCT_UPLOAD {
        @Override
        public String fileName() {
            return "ProductUploadTemplate.xlsx";
        }

        @Override
        public String filePath() {
            return "/downloads";
        }
    },

    PRODUCT_CATEGORY_UPLOAD {
        @Override
        public String fileName() {
            return "ProductCategoryUploadTemplate.xlsx";
        }

        @Override
        public String filePath() {
            return "/downloads";
        }
    };


    public abstract String fileName();

    public abstract String filePath();
}
