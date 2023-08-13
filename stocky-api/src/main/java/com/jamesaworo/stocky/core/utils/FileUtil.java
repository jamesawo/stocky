/*
 * @Author: james.junior
 * @Date: 8/10/23 14:34
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.utils;

import com.jamesaworo.stocky.core.constants.enums.FileType;
import com.jamesaworo.stocky.core.constants.enums.StringOrStringArray;
import com.jamesaworo.stocky.core.constants.enums.Template;
import com.jamesaworo.stocky.core.params.BiParam;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.ReportConstant.*;
import static com.jamesaworo.stocky.core.constants.enums.StringOrStringArray.STRING;
import static com.jamesaworo.stocky.core.constants.enums.StringOrStringArray.STRING_ARRAY;
import static com.jamesaworo.stocky.core.utils.ExportUtil.getFileFromClassPathAsInputStream;
import static java.lang.String.format;
import static java.util.Optional.empty;
import static org.springframework.util.ObjectUtils.isEmpty;

@Component
public class FileUtil {

    public static Resource findResource(Template template) {
        String filesPath = "src/main/resources" + template.filePath();
        try {
            Path file = Paths.get(filesPath).resolve(template.fileName());
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public static boolean isFileType(MultipartFile file, FileType type) {
        return type.mimeType().equals(file.getContentType());
    }

    public static boolean isNumberOfColumnsMatch(Sheet sheet, Integer checkAgainst) {
        int noOfColumns = sheet.getRow(0).getLastCellNum();
        return noOfColumns == checkAgainst;
    }

    public static Workbook openWorkbook(InputStream file) {
        try {
            return new XSSFWorkbook(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void closeWorkbook(Workbook workbook) {
        try {
            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Sheet getSheetAtPosition(Workbook workbook, int position) {
        Sheet sheet = workbook.getSheetAt(position);
        if (sheet != null) {
            return sheet;
        }
        throw new RuntimeException("No Sheet was found at position in workbook");
    }

    public static Integer numberOfRowsWithoutHeader(Sheet sheet) {
        if (sheet == null) return 0;
        return sheet.getPhysicalNumberOfRows() - 1;
    }

    public static Map<String, String> validateWorkbook(Workbook workbook, Template template, Integer position) {
        Map<String, String> map = new LinkedHashMap<>();

        if (workbook == null) {
            map.put("Invalid Workbook", "Workbook is not provided");
        }

        if (workbook != null && workbook.getSheetAt(position) == null) {
            map.put("Invalid Worksheet", "Data Work sheet was not found at the expected position");
        }

        if (workbook != null && !isNumberOfColumnsMatchTemplate(template, position, workbook.getSheetAt(position))) {
            map.put("Invalid Worksheet ", "The number of columns of the worksheet is not same as template");
        }
        return map;
    }

    /**
     * Validate uploaded workbook data sheet number of row.
     *
     * <p></p>
     * This method performs the following actions: <br>
     * 1. Get the paths to the template file from Template file enum (the template file is sample file which the user should fill and upload)<br>
     * 2. Creates a workbook using the template file.<br>
     * 3. Get the number of rows from the data sheet in the workbook of the template file.<br>
     * 4. Checks if the number of rows in the template file corresponds to the number of row in the uploaded sheet.<br>
     *
     * @param template: the template file enum.
     * @param position: the position of the data sheet in the workbook.
     * @param sheet:    the data sheet of the uploaded file.
     * @return boolean: true if the number of rows match, false if it does not match
     */
    private static boolean isNumberOfColumnsMatchTemplate(Template template, int position, Sheet sheet) {
        String templatePath = template.filePath() + template.fileName();
        Workbook templateWorkbook = openWorkbook(getFileFromClassPathAsInputStream(templatePath));
        int templateWorkbookDataSheetCellRows = getSheetAtPosition(templateWorkbook, position).getRow(0).getLastCellNum();
        boolean numberOfColumnsMatch = isNumberOfColumnsMatch(sheet, templateWorkbookDataSheetCellRows);
        closeWorkbook(templateWorkbook);
        return numberOfColumnsMatch;
    }

    public static boolean isEmptyRow(Row row) {
        boolean isEmpty = true;
        DataFormatter dataFormatter = new DataFormatter();
        if (row != null) {
            for (Cell cell : row) {
                if (dataFormatter.formatCellValue(cell).trim().length() > 0) {
                    isEmpty = false;
                    break;
                }
            }
        }
        return isEmpty;
    }

    public static int numberOfSheets(Workbook workbook) {
        if (workbook != null) {
            return workbook.getNumberOfSheets();
        }
        return 0;
    }

    public static String cellAddress(Row row, int cellPosition) {
        Cell cell = row.getCell(cellPosition);
        if (cell != null) {
            return cell.getAddress().formatAsString();
        }
        return "";
    }

    public static String[] cellStringArrayValue(String value) {
        if (!isEmpty(value) && value.contains(",")) {
            String[] split = value.split(",");
            for (int i = 0; i < split.length; i++) {
                String s = split[i];
                split[i] = s.trim();
            }
            return split;
        }
        return new String[]{};
    }

    public static BiParam<StringOrStringArray, BiParam<String, String[]>> splitCellValueSeperatedByComma(String value) {

        BiParam<String, String[]> stringOrStringArrayParam = new BiParam<>(EMPTY, new String[]{});
        BiParam<StringOrStringArray, BiParam<String, String[]>> resultBiParam = new BiParam<>(STRING, stringOrStringArrayParam);

        // is array
        if (!isEmpty(value) && value.contains(",")) {
            String[] split = value.split(",");
            stringOrStringArrayParam.setRight(Arrays.stream(split).map(String::trim).toArray(String[]::new));
            resultBiParam.setLeft(STRING_ARRAY);
        } else {
            stringOrStringArrayParam.setLeft(value);
            resultBiParam.setLeft(STRING);
        }

        return resultBiParam;
    }

    public static String rowCellStringValue(Row row, int cellPosition) {
        if (row != null) {
            return row.getCell(cellPosition).getStringCellValue();
        }
        return EMPTY;
    }

    public static double rowCellNumericValue(Row row, int cellPosition) {
        if (row != null) {
            return row.getCell(cellPosition).getNumericCellValue();
        }
        return 0;
    }

    private static void writeLogStats(PrintWriter printWriter, Map<String, String> logMap) {
        printWriter.println(DASHES + SPACE + DASHES);
        printWriter.println("Total number of records in worksheet: " + logMap.get(TOTAL_COUNT));
        printWriter.println("Total number of successful uploads: " + logMap.get(SUCCESS_COUNT));
        printWriter.println("Total number of failed uploads: " + logMap.get(FAILED_COUNT));
        printWriter.println("Summary of uploaded percentage: " + logMap.get(STATS_COUNT));
        printWriter.println("");
    }

    private static void removeLogStats(Map<String, String> logMap) {
        logMap.remove(TOTAL_COUNT);
        logMap.remove(SUCCESS_COUNT);
        logMap.remove(FAILED_COUNT);
        logMap.remove(STATS_COUNT);
    }

    public static byte[] writeProductScrapContentToFile(Map<String, String> logMap) {
        StringWriter writer = new StringWriter();
        PrintWriter printWriter = new PrintWriter(writer);

        writeLogStats(printWriter, logMap);
        removeLogStats(logMap);
        String lastKey = "";

        for (Map.Entry<String, String> entry : logMap.entrySet()) {
            String currentKey = entry.getKey().split("/")[0].trim();
            if (!currentKey.equals(lastKey)) {
                printWriter.println(DASHES + SPACE + DASHES);
            }
            lastKey = currentKey;
            writeLine(printWriter, entry);
        }
        return writer.toString().getBytes();
    }

    private static void writeLine(PrintWriter printWriter, Map.Entry<String, String> entry) {
        printWriter.println(entry.getKey() + SPACE + entry.getValue());
    }

    public static int cellDoubleValueToInt(double cellValue) {
        String[] split = String.valueOf(cellValue).split("\\.");
        return Integer.parseInt(split[0]);
    }

    public static <T> Optional<T> putInScrapLog(
            Map<String, String> scrapMap,
            Row row,
            int position,
            String rowNumber,
            String message
    ) {
        String cellAddress = cellAddress(row, position);
        String key = format(SCRAP_ERROR, rowNumber, cellAddress);
        scrapMap.put(key, "[ " + message + " ]");
        return empty();
    }

    public static String rowNumber(int rowIndex, boolean skipHeader) {
        if (skipHeader) {
            return rowIndex + 1 + SPACE;
        }
        return rowIndex + SPACE;
    }

    public static String rowNumber(int rowIndex) {
        int number = rowIndex + 1;
        return number + SPACE;
    }

    public static String uploadStatistics(Integer totalRowsCount, Integer successUploadCount, Integer failedUploadCount) {
        if (totalRowsCount <= 0) return "No data available.";

        double successRate = (double) successUploadCount / totalRowsCount * 100;
        double failedRate = (double) failedUploadCount / totalRowsCount * 100;
        return format("Success Rate: %.2f%%, Failed Rate: %.2f%%", successRate, failedRate);
    }

}
