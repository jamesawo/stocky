/*
 * @Author: james.junior
 * @Date: 5/22/23 01:08
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.endpoint;

import com.jamesaworo.stocky.features.product.data.interactor.implementation.ProductUnitOfMeasureInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductUnitOfMeasureRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/product/unit-of-measurement")
@RequiredArgsConstructor
public class ProductUnitOfMeasureEndpoint {

	private final ProductUnitOfMeasureInteractor interactor;

	@GetMapping(value = "/get/{id}")
	public ResponseEntity<Optional<ProductUnitOfMeasureRequest>> find(@PathVariable Long id) {
		return this.interactor.find(id);
	}

	@GetMapping("/all")
	public ResponseEntity<List<ProductUnitOfMeasureRequest>> findMany() {
		return this.interactor.findAll();
	}

	@PostMapping("/create")
	public ResponseEntity<Optional<ProductUnitOfMeasureRequest>> save(
			@RequestBody @Valid ProductUnitOfMeasureRequest dto
	) {
		return this.interactor.save(dto);
	}

	@PutMapping("/update")
	public ResponseEntity<Optional<ProductUnitOfMeasureRequest>> update(
			@RequestBody @Valid ProductUnitOfMeasureRequest dto
	) {
		return this.interactor.update(dto);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Optional<Boolean>> remove(@PathVariable Long id) {
		return this.interactor.remove(id);
	}
	
}
