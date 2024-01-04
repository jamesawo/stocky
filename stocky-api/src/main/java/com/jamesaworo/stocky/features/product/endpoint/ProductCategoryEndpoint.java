package com.jamesaworo.stocky.features.product.endpoint;

import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductCategoryInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductCategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@RestController
@RequestMapping(value = API_PREFIX + "/product/category")
@RequiredArgsConstructor
public class ProductCategoryEndpoint {
    private final IProductCategoryInteractor interactor;

    @GetMapping(value = "get/{id}")
    public ResponseEntity<ProductCategoryRequest> find(@PathVariable Long id) {
        return this.interactor.find(id);
    }

    @GetMapping("all")
    public ResponseEntity<List<ProductCategoryRequest>> findMany() {
        return this.interactor.findMany();
    }

    @PostMapping("create")
    public ResponseEntity<Optional<ProductCategoryRequest>> save(
            @RequestBody @Valid ProductCategoryRequest dto
    ) {
        return this.interactor.save(dto);
    }

    @PutMapping("update")
    public ResponseEntity<Optional<ProductCategoryRequest>> update(
            @RequestBody @Valid ProductCategoryRequest dto
    ) {
        return this.interactor.update(dto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Optional<Boolean>> remove(@PathVariable Long id) {
        return this.interactor.remove(id);
    }

    @GetMapping("search")
    public ResponseEntity<List<ProductCategoryRequest>> search(
            @RequestParam(value = "term") String term
    ) {
        return this.interactor.search(term);
    }

    @PutMapping("status/{id}")
    public ResponseEntity<Optional<Boolean>> toggleIsActiveStatus(@PathVariable Long id) {
        return this.interactor.toggleActiveStatus(id);
    }

    @GetMapping("/download-template")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile() throws IOException {
        return this.interactor.downloadTemplate();
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<?> uploadBatchCategories(@RequestParam("file") MultipartFile file) throws IOException {
        return this.interactor.uploadTemplate(file);
    }

}
