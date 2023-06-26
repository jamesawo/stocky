import {CustomerPayload, SupplierPayload} from '../src/app/routes/company/_data/company.payload';

const mockSupplier = new SupplierPayload();
mockSupplier.supplierFirstName = 'TEST SUPPLIER FIRST NAME';
mockSupplier.supplierLastName = 'TEST SUPPLIER LAST NAME';
mockSupplier.supplierBusinessName = 'TEST SUPPLIER BUSINESS NAME';


export const MOCK_SUPPLIER = mockSupplier;


const mockCustomer = new CustomerPayload();
mockCustomer.customerFirstName = 'TEST CUSTOMER FIRST NAME';
mockCustomer.customerLastName = 'TEST CUSTOMER LAST NAME';
mockCustomer.customerEmail = 'TEST@CUSTOMER.COM ';
mockCustomer.customerPhone = '09129021290';


export const MOCK_CUSTOMER = mockCustomer;
