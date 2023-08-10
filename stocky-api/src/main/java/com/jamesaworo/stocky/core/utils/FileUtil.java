/*
 * @Author: james.junior
 * @Date: 8/10/23 14:34
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.utils;

import com.jamesaworo.stocky.core.constants.enums.Template;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class FileUtil {

    public static String EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

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

    public static boolean isExcelFile(MultipartFile file) {
        return EXCEL_TYPE.equals(file.getContentType());
    }
}
