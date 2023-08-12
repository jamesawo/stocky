package com.jamesaworo.stocky.core.constants.enums;

public enum FileType {
    PDF {
        @Override
        public String extension() {
            return ".pdf";
        }

        public String mimeType() {
            return "application/pdf";
        }
    },
    EXCEL {
        @Override
        public String extension() {
            return ".xlsx";
        }

        public String mimeType() {
            return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            //return "application/vnd.ms-excel";
        }
    },
    CSV {
        @Override
        public String extension() {
            return ".csv";
        }

        public String mimeType() {
            return "text/csv";
        }
    },
    TXT {
        @Override
        public String extension() {
            return ".txt";
        }

        public String mimeType() {
            return "text/plain";
        }
    },
    WORD {
        @Override
        public String extension() {
            return ".doc";
        }

        public String mimeType() {
            return "application/msword";
        }
    },
    DOCX {
        @Override
        public String extension() {
            return ".docx";
        }

        public String mimeType() {
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        }
    },
    JPG {
        @Override
        public String extension() {
            return ".jpg";
        }

        public String mimeType() {
            return "image/jpeg";
        }
    },
    PNG {
        @Override
        public String extension() {
            return ".png";
        }

        public String mimeType() {
            return "image/png";
        }
    };

    public abstract String mimeType();

    public abstract String extension();
}
