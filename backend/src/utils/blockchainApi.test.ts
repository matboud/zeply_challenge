import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {
  fetchBalanceDetailsByAddress,
  fetchTotalUnspentByAddress,
} from "./blockchainApi";

const mock = new AxiosMockAdapter(axios);

describe("Blockchain API Utilities", () => {
  afterEach(() => {
    mock.reset();
  });

  it("fetches balance details by address", async () => {
    mock.onGet("https://blockchain.info/rawaddr/some-address").reply(200, {
      final_balance: 5000000000,
      n_tx: 5,
      total_received: 10000000000,
      total_sent: 5000000000,
    });

    mock
      .onGet("https://blockchain.info/unspent?active=some-address")
      .reply(200, {
        unspent_outputs: [{ value: 2000000000 }, { value: 3000000000 }],
      });

    const details = await fetchBalanceDetailsByAddress("some-address");
    expect(details).toEqual({
      numberOfConfirmedTransaction: 5,
      totalBtcReceived: 100,
      totalBtcSpent: 50,
      totalBtcUnspent: 50,
      currentAddressBalance: 5000000000,
    });
  });

  it("fetches total unspent by address", async () => {
    mock
      .onGet("https://blockchain.info/unspent?active=some-address")
      .reply(200, {
        unspent_outputs: [{ value: 2000000000 }, { value: 3000000000 }],
      });

    const totalUnspent = await fetchTotalUnspentByAddress("some-address");
    expect(totalUnspent).toBe(5000000000);
  });

  // ... more tests for other functions
});
