export class Message {
    static COMING_SOON = 'This feature is currently updating, check back soon';
    static GENERIC_SUCCESS_MESSAGE = 'Action Successful';
    static CATEGORY_SAVED = 'Category saved!';
    static INVALID_FORM_FIELDS = `Some fields are invalid. <br>Please fix it and try again`;
    static INVALID_ENTRY_TRY_AGAIN = 'Please check your form entries and try again!';
    static VALIDATION_ERROR = 'Validation Error';
    static SELECT_PAYMENT_OPTION = 'Select Payment Option';
    static PAYMENT_OPTION_REQUIRED = 'Please ensure that you have selected a payment option before continuing';
    static CART_IS_REQUIRED = 'The cart is not found, please refresh and add products';
}

export class PopOverConstant {
    static POP_TITLE = 'HELP';
    static PRODUCT_CATEGORY_PARENT = `When creating a subcategory, <br> please select its parent category first.`;
}

export class ProductPopover {
    static PRODUCT_BASIC_DETAIL = `Provide essential information about the product, such as its category, title, etc.`;
    static PRODUCT_BRAND = `Specify the brand or manufacturer of the product. <br> Enter the name of the company or brand that produces or markets the product`;
    static PRODUCT_SKU = `Enter the unique Stock Keeping Unit (SKU) for the product. <br> The SKU is a distinct identifier used to track inventory and manage product variations`;
    static PRODUCT_UNIT_MEASURE = `Specify the unit of measure for the product. <br> This refers to the standard unit used to quantify or measure the product's quantity or size. <br> Examples include kilograms (kg), meters (m), liters (L), or pieces (pcs)`;
    static PRODUCT_STATUS = `Indicate the current status of the product. <br> Select the appropriate option that reflects the availability or condition of the product.`;
    static PRODUCT_IS_SERVICE = `If this item is a service then select this option, <br> service do not make use of stock and inventory quantity.`;
    static PRODUCT_DESCRIPTION = `Provide a brief and informative description of the product.`;
    // price
    static PRODUCT_PRICE_DETAIL = `To ensure accurate pricing and tax calculations for your products, <br> it's essential to properly configure the price and tax settings.`;
}
