/*
 * @Author: james.junior
 * @Date: 10/1/22 5:13 PM
 *
 * @Project: Stocky
 */
package com.jamesaworo.stocky.core.utils;


import net.sf.jasperreports.engine.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Locale;

@Component
public class ExportUtil {

    public static final String INVALID_FILE_PATH = "INVALID REPORT FILE PATH SUPPLIED";

    public static byte[] generatePDFBytes(HashMap<String, Object> parameters, InputStream reportFileAsInputStream, JRDataSource dataSource) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            parameters.put(JRParameter.REPORT_LOCALE, Locale.ENGLISH);
            JasperReport jasperReport = JasperCompileManager.compileReport(reportFileAsInputStream);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);
            return outputStream.toByteArray();
        } catch (JRException | IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    public static String getAbsoluteFilePath(String path) {
        try {
            return ResourceUtils.getFile(ResourceUtils.CLASSPATH_URL_PREFIX + path).getAbsolutePath();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(INVALID_FILE_PATH + " " + e.getMessage(), e);
        }
    }

    public static InputStream getFileFromClassPathAsInputStream(String path) {
        try {
            return new ClassPathResource(path).getInputStream();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(INVALID_FILE_PATH + " " + e.getMessage(), e);
        }
    }
}
