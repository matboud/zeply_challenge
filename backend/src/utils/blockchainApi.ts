import axios, {AxiosResponse} from "axios";
import {
    AddressBalanceResponse,
    AddressSearch,
    AddressUnspentResponse,
    ExchangeRate,
    TransactionHashResponse,
    TransactionSearch
} from "../types/blockchainTypes";
import {ApiException} from "./apiException";

const BASE_URI = 'https://blockchain.info';

const convertDefaultAmountToBTC = (amountInBTC: number) => { // satoshies 1BTC =100 000 000 sa
    return (amountInBTC / 1e8) || 0;
};

function validate_response(response: AxiosResponse) {
    if (response.status >= 400) {
        const errorData = response.data;
        throw new ApiException(response.status, errorData.message);
    }
}

const fetchBalanceDetailsByAddress = async (address: string): Promise<AddressSearch | null> => {
    const url = `${BASE_URI}/rawaddr/${address}`;
    const response: AxiosResponse = await axios.get(url);
    validate_response(response);
    const responseDetails: AddressBalanceResponse = response.data;
    const totalUnspent = await fetchTotalUnspentByAddress(address);
    return {
        numberOfConfirmedTransaction: responseDetails.n_tx,
        totalBtcReceived: convertDefaultAmountToBTC(responseDetails.total_received),
        totalBtcSpent: convertDefaultAmountToBTC(responseDetails.total_sent),
        totalBtcUnspent: convertDefaultAmountToBTC(totalUnspent),
        currentAddressBalance: responseDetails.final_balance,
    }
}

export const fetchTotalUnspentByAddress = async (address: string): Promise<number> => {
    const url = `${BASE_URI}/unspent?active=${address}`;
    const response: AxiosResponse = await axios.get(url);
    let totalUnspent = 0;
    validate_response(response);
    const data: AddressUnspentResponse = response.data;
    data.unspent_outputs.forEach(output => {
        totalUnspent += output.value;
    });

    return totalUnspent;
}

const fetchCurrentBlockCount = async (): Promise<number> => {
    const url = `${BASE_URI}/q/getblockcount`;
    const response: AxiosResponse = await axios.get(url);
    validate_response(response);
    return response.data;
}

const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
    const currenciesToFilter = ["EUR", "USD"];
    const currencyRates = []
    const response: AxiosResponse = await axios.get(`${BASE_URI}/ticker`);
    validate_response(response);
    // look for only EUR & USD exchange rates
    for (const currencyCode of currenciesToFilter) {
        currencyRates.push({currency: currencyCode, rate: Number(response.data[currencyCode].last)});
    }
    return currencyRates;
};

const fetchTransactionDetails = async (hash: string): Promise<TransactionSearch> => {
    const url = `${BASE_URI}/rawtx/${hash}`;

    const currentBlocCount = await fetchCurrentBlockCount();
    //TODO  amine check this and tell me what do you think in get request ,
    // otherwise  it directly throws an exception cant be managed
    const response = await axios.get(url,{
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    });
    validate_response(response);
    const data: TransactionHashResponse = response.data

    return {
        transactionHash: data.hash,
        receivedTime: new Date(data.time * 1000).toUTCString(), //epoch
        status: data.fee > 0 ? "Confirmed" : "Unconfirmed",
        size: data.size,
        numberOfConfirmation: currentBlocCount - data.block_height + 1,
        // current_block_count - transaction_block_height + 1
        totalBtcInput: convertDefaultAmountToBTC(data.inputs.reduce((acc, input) => acc + input.prev_out.value, 0)),
        totalBtcOutput: convertDefaultAmountToBTC(data.out.reduce((acc, output) => acc + output.value, 0)),
        totalFees: convertDefaultAmountToBTC(data.fee),
    };
};

export {
    fetchBalanceDetailsByAddress,
    fetchTransactionDetails,
    fetchCurrentBlockCount,
    fetchExchangeRates
};

