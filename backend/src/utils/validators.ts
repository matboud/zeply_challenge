const VALID_BTC_ADDRESS_REGEX = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
const VALID_TRANSACTION_REGEX = /^[a-fA-F0-9]{64}$/;
const VALID_CURRENCY_REGEX = /^(USD|EUR)$/;


/**
 *  A simplified regex for Bitcoin address validation.
 *  This might not handle all valid address formats.
 * @param address the address to validate
 */
export function isValidAddress(address: string): boolean {
    return VALID_BTC_ADDRESS_REGEX.test(address);
}

export function isValidTransaction(transactionHash: string): boolean {
    return VALID_TRANSACTION_REGEX.test(transactionHash);
}