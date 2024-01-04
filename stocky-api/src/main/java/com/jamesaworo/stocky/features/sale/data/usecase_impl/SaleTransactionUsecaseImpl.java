/*
 * @Author: james.junior
 * @Date: 7/25/23 09:36
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.core.constants.Setting;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.utils.Util;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyCustomer;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyCustomerUsecase;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUsecase;
import com.jamesaworo.stocky.features.sale.data.repository.SaleTransactionRepository;
import com.jamesaworo.stocky.features.sale.data.request.SaleTransactionRequest;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionAmountUsecase;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionInstallmentUsecase;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionItemUsecase;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionUsecase;
import com.jamesaworo.stocky.features.settings.data.usecases_impl.SettingStockUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.utils.Util.receiptSerial;
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
    private final IProductUsecase productUsecase;
    private final SettingStockUsecase stockSetting;


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
     * @param transaction      The SaleTransaction object to be saved.
     * @param transactionItems The List of SaleTransactionItems
     * @return The saved SaleTransaction object.
     * @throws RuntimeException if there is an error while saving the transaction and Roll back Database operations.
     * @since 1.0.0
     */
    @Override
    @Transactional
    public SaleTransaction save(SaleTransaction transaction, List<SaleTransactionItem> transactionItems) {
        try {
            this.findAndSetCustomer(transaction);
            this.findAndSetEmployee(transaction);
            this.saveAndSetReceiptDateAndTime(transaction);

            this.amountUsecase.saveAndSet(transaction);
            this.installmentUsecase.saveAndSet(transaction);

            SaleTransaction savedTransaction = this.repository.save(transaction);
            this.saveAndSetReceiptReferenceSerial(savedTransaction);
            this.saveAndSetItems(savedTransaction, transactionItems);
            this.deductProductQuantityAfterSales(transactionItems);

            return savedTransaction;
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
        if (!isEmpty(transaction.getCustomer()) && transaction.getCustomer().getId() != null) {
            Optional<CompanyCustomer> optionalCustomer = this.customerUsecase.findOne(transaction.getCustomer().getId());
            optionalCustomer.ifPresent(transaction::setCustomer);
        } else {
            transaction.setCustomer(null);
        }
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
     * @param items       The List of SaleTransactionItem which is part of the transaction object.
     * @since 1.0.0
     */
    private void saveAndSetItems(SaleTransaction transaction, List<SaleTransactionItem> items) {
        if (!isEmpty(items)) {
            for (SaleTransactionItem item : items) {
                item.setTransaction(transaction);
                SaleTransactionItem save = itemUsecase.save(item);
                item.setId(save.getId());
            }
        }
    }

    /**
     * Generates and sets a unique serial and reference for the provided SaleTransaction.
     * <p>
     * This method generates a random alphanumeric string of length 6 for the token and length 10 for the reference,
     * and sets them in the provided SaleTransaction object.
     *
     * @param transaction The SaleTransaction object for which to generate and set the token and reference.
     * @since 1.0.0
     */
    private void saveAndSetReceiptReferenceSerial(SaleTransaction transaction) {
        String id = transaction.getId() != null ? transaction.getId().toString() : "";
        transaction.setReference(Util.randomNumeric(10) + id);
        String serial = receiptSerial(5) + id;
        transaction.setSerial(serial);
        this.repository.save(transaction);
    }

    /**
     * Sets date and time properties of the transaction object
     *
     * @param transaction The SaleTransaction object for which to generate and set the token and reference.
     * @since 1.0.0
     */
    private void saveAndSetReceiptDateAndTime(SaleTransaction transaction) {
        transaction.setDate(LocalDate.now());
        transaction.setTime(LocalTime.now());
    }

    /**
     * This method is used to deduct the quantity of product sold from product stock balance
     * <p>
     * This method performs the following steps:
     * <p>
     * 1. Checks if Stock is enabled in settings, if not enable it returns and deduction is performed
     * 2. Iterates through the list of sale transaction items
     * 3. Calls deduct method on product usecase
     *
     * @param items The saved list of sale transaction item
     */
    private void deductProductQuantityAfterSales(List<SaleTransactionItem> items) {
        Boolean asBool = this.stockSetting.getAsBool(Setting.SETTING_STOCK_ENABLE_STOCK);
        if (!asBool) return;

        for (SaleTransactionItem item : items) {
            Optional<SaleTransactionItem> optionalItem = this.itemUsecase.find(item.getId());
            optionalItem.ifPresent(savedItem -> {
                this.productUsecase.deductProductQuantityAfterSales(savedItem.getProduct(), savedItem.getQuantity());
            });
        }
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
     * This method is used to find a single SaleTransaction object based on the given reference and serial.
     *
     * @param reference the reference of the SaleTransaction object to be retrieved.
     * @param serial    the serial of the SaleTransaction object to be retrieved.
     * @return an Optional object containing the SaleTransaction object if found, otherwise empty.
     */
    @Override
    public Optional<SaleTransaction> findOne(String reference, String serial) {
        return this.repository.findByReferenceEqualsAndSerialEquals(reference, serial);
    }

    /**
     * This method is used to find a single SaleTransaction object based on serial of the transaction.
     *
     * @param serial the serial of the SaleTransaction object to be retrieved.
     * @return an Optional object containing the SaleTransaction object if found, otherwise empty.
     */
    @Override
    public Optional<SaleTransaction> findOne(String serial) {
        return this.repository.findBySerialEqualsIgnoreCase(serial);
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
