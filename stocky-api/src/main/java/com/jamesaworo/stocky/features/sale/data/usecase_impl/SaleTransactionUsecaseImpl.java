/*
 * @Author: james.junior
 * @Date: 7/25/23 09:36
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.utils.Util;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IUserUsecase;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyCustomer;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyCustomerUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyEmployeeUsecase;
import com.jamesaworo.stocky.features.sale.data.repository.SaleTransactionRepository;
import com.jamesaworo.stocky.features.sale.data.request.SaleTransactionRequest;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionAmountUsecase;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionInstallmentUsecase;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionItemUsecase;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;
import static org.springframework.util.ObjectUtils.isEmpty;


@Usecase
@RequiredArgsConstructor
public class SaleTransactionUsecaseImpl implements SaleTransactionUsecase, Mapper<SaleTransactionRequest, SaleTransaction> {

    private final ModelMapper mapper;
    private final SaleTransactionRepository repository;
    private final SaleTransactionAmountUsecase amountUsecase;
    private final SaleTransactionInstallmentUsecase installmentUsecase;
    private final SaleTransactionItemUsecase itemUsecase;
    private final ICompanyCustomerUsecase customerUsecase;
    private final ICompanyEmployeeUsecase employeeUsecase;
    private final IUserUsecase userUsecase;


    /**
     * Saves a SaleTransaction object.
     * <p>
     * This method saves the given SaleTransaction object by performing the following steps:
     * </p>
     * <p> Saves and sets the items associated with the transaction. </p>
     * <p> Finds and sets the customer associated with the transaction. </p>
     * <p> Finds and sets the employee associated with the transaction.</p>
     * <p> Saves and sets the amount for the transaction.</p>
     * <p> Saves and sets the reference and token for the transaction.</p>
     * <p> Saves and sets the installment details for the transaction.</p>
     * <p>  Finally, saves the transaction to the repository.</p>
     *
     * @param transaction The SaleTransaction object to be saved.
     * @return The saved SaleTransaction object.
     * @throws RuntimeException if there is an error while saving the transaction and Roll back Database operations.
     * @since 1.0.0
     */
    @Override
    @Transactional
    public SaleTransaction save(SaleTransaction transaction) {
        try {
            this.saveAndSetItems(transaction);
            this.findAndSetCustomer(transaction);
            this.findAndSetEmployee(transaction);
            this.saveAndSetReferenceTokenDateAndTime(transaction);
            this.amountUsecase.saveAndSet(transaction);
            this.installmentUsecase.saveAndSet(transaction);

            return this.repository.save(transaction);
        } catch (Exception e) {
            throw new RuntimeException("Error while saving the transaction.", e);
        }
    }

    /**
     * Finds and sets the customer for the given SaleTransaction.
     * <p>
     * This method retrieves the customer associated with the provided customer ID from the customer use case.
     * If a customer is found, it sets the customer for the transaction.
     *
     * @param transaction The SaleTransaction object for which to find and set the customer.
     * @since 1.0.0
     */
    private void findAndSetCustomer(SaleTransaction transaction) {
        Optional<CompanyCustomer> optionalCustomer = this.customerUsecase.findOne(transaction.getCustomer().getId());
        optionalCustomer.ifPresent(transaction::setCustomer);
    }

    /**
     * Finds and sets the employee for the given SaleTransaction.
     * <p>
     * This method retrieves the employee associated with the provided employee ID from the employee use case.
     * If an employee is found, it sets the employee for the transaction.
     *
     * @param transaction The SaleTransaction object for which to find and set the employee.
     * @since 1.0.0
     */
    private void findAndSetEmployee(SaleTransaction transaction) {
        /* todo:: add user to transaction not employee
        Optional<CompanyEmployee> optionalEmployee = this.employeeUsecase.findOne(transaction.getUser().getId());
        optionalEmployee.ifPresent(transaction::setUser);
        */

    }

    /**
     * Saves and sets the items for the given SaleTransaction.
     * <p>
     * This method checks if the items list in the provided SaleTransaction is not empty.
     * If the list is not empty, it saves each item using the item use case and sets the saved items in the transaction.
     *
     * @param transaction The SaleTransaction object for which to save and set the items.
     * @since 1.0.0
     */
    private void saveAndSetItems(SaleTransaction transaction) {
        if (!isEmpty(transaction.getItems())) {
            transaction.setItems(transaction.getItems().stream().map(itemUsecase::save).collect(toList()));
        }
    }

    /**
     * Generates and sets a unique token and reference for the provided SaleTransaction.
     * <p>
     * This method generates a random alphanumeric string of length 6 for the token and length 10 for the reference,
     * and sets them in the provided SaleTransaction object.
     * It also sets the current date and time in the transaction object.
     *
     * @param transaction The SaleTransaction object for which to generate and set the token and reference.
     * @since 1.0.0
     */
    private void saveAndSetReferenceTokenDateAndTime(SaleTransaction transaction) {
        transaction.setReference(Util.randomAlphanumeric(10));
        transaction.setToken(Util.randomAlphanumeric(6));
        transaction.setDate(LocalDate.now());
        transaction.setTime(LocalTime.now());
    }

    /**
     * This method is used to find multiple SaleTransaction objects based on the given Specification and Pageable.
     *
     * @param specification the Specification used to filter the SaleTransaction objects.
     * @param pageable      the Pageable used to paginate the results.
     * @return a Page object containing the filtered SaleTransaction objects.
     */
    @Override
    public Page<SaleTransaction> findMany(Specification<SaleTransaction> specification, Pageable pageable) {
        return this.repository.findAll(specification, pageable);
    }

    /**
     * This method is used to find multiple SaleTransaction objects based on the given Specification.
     *
     * @param specification the Specification used to filter the SaleTransaction objects.
     * @return a List object containing the filtered SaleTransaction objects.
     */
    @Override
    public List<SaleTransaction> findMany(Specification<SaleTransaction> specification) {
        return this.repository.findAll(specification);
    }

    /**
     * This method is used to find a single SaleTransaction object based on the given id.
     *
     * @param id the id of the SaleTransaction object to be retrieved.
     * @return an Optional object containing the SaleTransaction object if found, otherwise empty.
     */
    @Override
    public Optional<SaleTransaction> findOne(Long id) {
        return this.repository.findById(id);
    }

    /**
     * This method is used to find a single SaleTransaction object based on the given reference and token.
     *
     * @param reference the reference of the SaleTransaction object to be retrieved.
     * @param token     the token of the SaleTransaction object to be retrieved.
     * @return an Optional object containing the SaleTransaction object if found, otherwise empty.
     */
    @Override
    public Optional<SaleTransaction> findOne(String reference, String token) {
        return this.repository.findByReferenceEqualsAndTokenEquals(reference, token);
    }

    /**
     * This method is used to convert a SaleTransaction object to a SaleTransactionRequest object.
     *
     * @param model the SaleTransaction object to be converted.
     * @return a SaleTransactionRequest object representing the converted SaleTransaction.
     */
    @Override
    public SaleTransactionRequest toRequest(SaleTransaction model) {
        return mapper.map(model, SaleTransactionRequest.class);
    }

    /**
     * This method is used to convert a SaleTransactionRequest object to a SaleTransaction object.
     *
     * @param request the SaleTransactionRequest object to be converted.
     * @return a SaleTransaction object representing the converted SaleTransactionRequest.
     */
    @Override
    public SaleTransaction toModel(SaleTransactionRequest request) {
        return mapper.map(request, SaleTransaction.class);
    }
}