package com.jamesaworo.stocky.features.product.endpoint;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductSearchRequest;
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
@RequestMapping(value = API_PREFIX + "/product")
@RequiredArgsConstructor
public class ProductEndpoint {

	private final IProductInteractor interactor;

	@PostMapping(value = "/create")
	public ResponseEntity<ProductRequest> create(@RequestBody ProductRequest request) {
		return this.interactor.save(request);
	}

	@PostMapping(value = "/search-request")
	public ResponseEntity<PageSearchResult<List<ProductRequest>>> searchProducts(
			@Valid @RequestBody PageSearchRequest<ProductSearchRequest> request
	) {
		return this.interactor.search(request);
	}

	@GetMapping("search")
	public ResponseEntity<List<ProductRequest>> search(
			@RequestParam(value = "term") String term
	) {
		return this.interactor.search(term);
	}
}