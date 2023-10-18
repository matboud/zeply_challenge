export interface AddressBalanceResponse {
  final_balance: number;
  n_tx: number;
  total_received: number;
  total_sent: number;
}

export interface AddressUnspentResponse {
  unspent_outputs: Array<{ value: number }>;
}

export interface SearchQueryDetails {
  queryValue: string;
  queryType: "address" | "transaction";
}

export interface ExchangeRate {
  currency: string;
  rate: number;
}

export interface TransactionHashResponse {
  hash: string;
  time: number;
  size: number;
  fee: number;
  block_height: number;
  inputs: Array<{ prev_out: { value: number } }>;
  out: Array<{ value: number }>;
}

export interface AddressSearch {
  numberOfConfirmedTransaction: number;
  totalBtcReceived: number;
  totalBtcSpent: number;
  totalBtcUnspent: number;
  currentAddressBalance: number;
}

export interface TransactionSearch {
  transactionHash: string;
  receivedTime: string;
  status: string;
  size: number; // in bytes
  numberOfConfirmation: number;
  totalBtcInput: number;
  totalBtcOutput: number;
  totalFees: number;
}
