/*
 * @Author: james.junior
 * @Date: 8/10/23 14:17
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.params;

import com.jamesaworo.stocky.core.constants.enums.Template;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

public interface FileHandler<R, I> {
    Resource downloadTemplate(Template template);

    ResponseEntity<R> uploadTemplate(I input);

}
