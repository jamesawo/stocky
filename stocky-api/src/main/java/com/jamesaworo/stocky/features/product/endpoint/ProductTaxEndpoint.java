/*
 * @Author: james.junior
 * @Date: 5/22/23 01:08
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.endpoint;

import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductTaxInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductTaxRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/product/tax")
@RequiredArgsConstructor
public class ProductTaxEndpoint {

	private final IProductTaxInteractor interactor;

	@GetMapping(value = "get/{id}")
	public ResponseEntity<Optional<ProductTaxRequest>> find(@PathVariable Long id) {
		return this.interactor.find(id);
	}

	@GetMapping("all")
	public ResponseEntity<List<ProductTaxRequest>> findMany() {
		return this.interactor.findAll();
	}

	@PostMapping("create")
	public ResponseEntity<Optional<ProductTaxRequest>> save(
			@RequestBody @Valid ProductTaxRequest dto
	) {
		return this.interactor.save(dto);
	}

	@PutMapping("update")
	public ResponseEntity<Optional<ProductTaxRequest>> update(
			@RequestBody @Valid ProductTaxRequest request
	) {
		return this.interactor.update(request);
	}

	@DeleteMapping("delete/{id}")
	public ResponseEntity<Optional<Boolean>> remove(@PathVariable Long id) {
		return this.interactor.remove(id);
	}

	@PutMapping("status/{id}")
	public ResponseEntity<Optional<Boolean>> toggleIsActiveStatus(@PathVariable Long id) {
		return this.interactor.toggleActiveStatus(id);
	}

}
