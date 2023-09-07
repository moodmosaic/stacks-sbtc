import { Account, Chain, Clarinet, Tx, types } from "./deps.ts";

export function bootstrap(chain: Chain, accounts: Map<string, Account>) {
  const deployer = accounts.get("deployer")!;

  chain.mineBlock([
    Tx.contractCall(
      `${deployer.address}.sbtc-controller`,
      "upgrade",
      [types.list(
        [
          ".sbtc-testnet-debug-controller",
        ].map((contract) => types.tuple({ contract, enabled: true })),
      )],
      deployer.address,
    ),
  ]).receipts.map(({ result }) =>
    result.expectOk().expectList().map((result) => result.expectBool(true))
  );

  chain.mineBlock([
    Tx.contractCall(
      "sbtc-token_test",
      "prepare",
      [types.uint(10000000), types.principal(accounts.get("wallet_1")!.address)],
      deployer.address,
    ),
    Tx.contractCall(
      "sbtc-token_test",
      "prepare",
      [types.uint(10000000), types.principal(accounts.get("wallet_2")!.address)],
      deployer.address,
    ),
  ]).receipts.map(({ result }) => result.expectOk());
}

Clarinet.test({
  name: "test-transfer-someone-elses-tokens: Cannot transfer someone else's tokens",
  fn(chain: Chain, accounts: Map<string, Account>) {
    bootstrap(chain, accounts);

    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-transfer-someone-elses-tokens",
        [types.principal(accounts.get("wallet_2")!.address)],
        accounts.get("wallet_1")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-transfer: Token owner can transfer their tokens",
  fn(chain: Chain, accounts: Map<string, Account>) {
    bootstrap(chain, accounts);

    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-transfer",
        [types.principal(accounts.get("wallet_2")!.address)],
        accounts.get("wallet_1")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-total-supply: Can get total supply",
  fn(chain: Chain, accounts: Map<string, Account>) {
    bootstrap(chain, accounts);

    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-total-supply",
        [],
        accounts.get("deployer")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-token-uri: Can get token URI",
  fn(chain: Chain, accounts: Map<string, Account>) {
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-token-uri",
        [],
        accounts.get("deployer")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-symbol: Can get symbol",
  fn(chain: Chain, accounts: Map<string, Account>) {
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-symbol",
        [],
        accounts.get("deployer")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-name: Can get name",
  fn(chain: Chain, accounts: Map<string, Account>) {
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-name",
        [],
        accounts.get("deployer")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-decimals: Can get decimals",
  fn(chain: Chain, accounts: Map<string, Account>) {
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-decimals",
        [],
        accounts.get("deployer")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-balance: Can user balance",
  fn(chain: Chain, accounts: Map<string, Account>) {
    bootstrap(chain, accounts);

    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-balance",
        [types.principal(accounts.get("wallet_1")!.address)],
        accounts.get("deployer")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});
