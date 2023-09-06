import { Account, Chain, Clarinet, Tx, types } from "./deps.ts";

Clarinet.test({
  name: "test-transfer-someone-elses-tokens: Cannot transfer someone else's tokens",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const bootstrapContracts = [
      ".sbtc-testnet-debug-controller",
    ];
    chain.mineBlock([
      Tx.contractCall(
        `${deployer.address}.sbtc-controller`,
        "upgrade",
        [types.list(
          bootstrapContracts.map((contract) =>
            types.tuple({ contract, enabled: true })
          ),
        )],
        deployer.address,
      ),
    ]).receipts[0].result.expectOk().expectList().map((result) =>
      result.expectBool(true)
    );

    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "prepare",
        [types.uint(10000000)],
        deployer.address,
      ),

      Tx.contractCall(
        "sbtc-token_test",
        "test-transfer-someone-elses-tokens",
        [],
        accounts.get("wallet_1")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-transfer: Token owner can transfer their tokens",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const bootstrapContracts = [
      ".sbtc-testnet-debug-controller",
    ];
    chain.mineBlock([
      Tx.contractCall(
        `${deployer.address}.sbtc-controller`,
        "upgrade",
        [types.list(
          bootstrapContracts.map((contract) =>
            types.tuple({ contract, enabled: true })
          ),
        )],
        deployer.address,
      ),
    ]).receipts[0].result.expectOk().expectList().map((result) =>
      result.expectBool(true)
    );

    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "prepare",
        [types.uint(10000000)],
        deployer.address,
      ),

      Tx.contractCall(
        "sbtc-token_test",
        "test-transfer",
        [],
        accounts.get("wallet_1")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-total-supply: Can get total supply",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const bootstrapContracts = [
      ".sbtc-testnet-debug-controller",
    ];
    chain.mineBlock([
      Tx.contractCall(
        `${deployer.address}.sbtc-controller`,
        "upgrade",
        [types.list(
          bootstrapContracts.map((contract) =>
            types.tuple({ contract, enabled: true })
          ),
        )],
        deployer.address,
      ),
    ]).receipts[0].result.expectOk().expectList().map((result) =>
      result.expectBool(true)
    );

    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "prepare",
        [types.uint(10000000)],
        deployer.address,
      ),

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
    const deployer = accounts.get("deployer")!;
    const bootstrapContracts = [
      ".sbtc-testnet-debug-controller",
    ];
    chain.mineBlock([
      Tx.contractCall(
        `${deployer.address}.sbtc-controller`,
        "upgrade",
        [types.list(
          bootstrapContracts.map((contract) =>
            types.tuple({ contract, enabled: true })
          ),
        )],
        deployer.address,
      ),
    ]).receipts[0].result.expectOk().expectList().map((result) =>
      result.expectBool(true)
    );

    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "prepare",
        [types.uint(10000000)],
        deployer.address,
      ),

      Tx.contractCall(
        "sbtc-token_test",
        "test-get-balance",
        [],
        accounts.get("deployer")!.address,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});
