package com.jamesaworo.stocky.features.product.endpoint;

import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductVariantInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductVariantRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@RestController
@RequestMapping(value = API_PREFIX + "/product-variant")
@RequiredArgsConstructor
public class ProductVariantEndpoint {

    private final IProductVariantInteractor interactor;

    @GetMapping("/{id}")
    public ResponseEntity<ProductVariantRequest> findOne(@PathVariable Long id) {
        return this.interactor.findOne(id);
    }

    @PostMapping
    public ResponseEntity<ProductVariantRequest> save(@RequestBody @Valid ProductVariantRequest request) {
        return this.interactor.save(request);
    }

    @GetMapping
    public ResponseEntity<List<ProductVariantRequest>> findAll() {
        return this.interactor.findAll();
    }

    @PutMapping
    public ResponseEntity<ProductVariantRequest> update(@RequestBody @Valid ProductVariantRequest request) {
        return this.interactor.update(request);
    }


}