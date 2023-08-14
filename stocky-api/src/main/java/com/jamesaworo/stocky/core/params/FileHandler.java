/*
 * @Author: james.junior
 * @Date: 8/10/23 14:17
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.params;

import com.jamesaworo.stocky.core.constants.enums.Template;
import org.springframework.core.io.Resource;

public interface FileHandler<R, I> {
    Resource downloadTemplate(Template template);

    // todo:: Before uploading, perform the following
    //  1. check user plan,
    //  2. count existing entity size
    R uploadTemplate(I input);
}
