package com.jamesaworo.stocky.features.product.endpoint;

import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductCategoryInteractor;
import com.jamesaworo.stocky.features.product.data.pojo.ProductCategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@RestController
@RequestMapping(value = API_PREFIX + "/product-category")
@RequiredArgsConstructor
public class ProductCategoryEndpoint {
    private final IProductCategoryInteractor interactor;

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProductCategoryRequest> find(@PathVariable Long id) {
        return this.interactor.find(id);
    }

    @GetMapping()
    public ResponseEntity<List<ProductCategoryRequest>> findMany() {
        return this.interactor.findMany();
    }

    @PostMapping()
    public ResponseEntity<Optional<ProductCategoryRequest>> save(
            @RequestBody @Valid ProductCategoryRequest dto) {
        return this.interactor.save(dto);
    }

    @PutMapping()
    public ResponseEntity<Optional<ProductCategoryRequest>> update(
            @RequestBody @Valid ProductCategoryRequest dto
    ) {
        return this.interactor.update(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Boolean>> remove(@PathVariable Long id) {
        return this.interactor.remove(id);
    }

}