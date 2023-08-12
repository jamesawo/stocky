/*
 * @Author: james.junior
 * @Date: 8/10/23 14:34
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.utils;

import com.jamesaworo.stocky.core.constants.enums.FileType;
import com.jamesaworo.stocky.core.constants.enums.Template;
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
import java.util.LinkedHashMap;
import java.util.Map;

import static com.jamesaworo.stocky.core.utils.ExportUtil.getFileFromClassPathAsInputStream;
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

    public static Integer getNumberOfRowsWithoutHeader(Sheet sheet) {
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

    public static String[] cellValueToStringArray(String value) {
        if (!isEmpty(value) && value.contains(",")) {
            String[] split = value.split(",");
            for (int i = 0; i < split.length; i++) {
                String s = split[i];
                split[i] = s.trim();
            }
            return split;
        }
        return new String[0];
    }

    public static byte[] writeLogContentToFile(Map<String, String> logMap) {
        // Create a string to store the log content
        StringWriter writer = new StringWriter();
        PrintWriter printWriter = new PrintWriter(writer);

        for (Map.Entry<String, String> entry : logMap.entrySet()) {
            writeLine(printWriter, entry);
        }

        return writer.toString().getBytes();
    }

    public static byte[] writeProductScrapContentToFile(Map<String, String> logMap) {
        StringWriter writer = new StringWriter();
        PrintWriter printWriter = new PrintWriter(writer);

        int totalEntries = logMap.size();
        int count = 0;

        // Write the last 3 entries first
        for (Map.Entry<String, String> entry : logMap.entrySet()) {
            if (count >= totalEntries - 4) {
                writeLine(printWriter, entry);
            }
            count++;
        }

        count = 0; // Reset count for writing the remaining entries

        // Write the remaining entries
        for (Map.Entry<String, String> entry : logMap.entrySet()) {
            if (count < totalEntries - 4) {
                writeLine(printWriter, entry);
            }
            count++;
        }

        return writer.toString().getBytes();
    }

    private static void writeLine(PrintWriter printWriter, Map.Entry<String, String> entry) {
        printWriter.println(entry.getKey() + " " + entry.getValue());
    }

    public static int cellDoubleValueToInt(double cellValue) {
        String[] split = String.valueOf(cellValue).split("\\.");
        return Integer.parseInt(split[0]);
    }

}
