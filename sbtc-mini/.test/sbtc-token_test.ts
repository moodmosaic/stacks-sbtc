import { Account, Chain, Clarinet, Tx, types } from "./deps.ts";

Clarinet.test({
  name: "test-transfer-external: Cannot transfer someone else's tokens",
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

    const callerAddress = accounts.get("wallet_1")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "prepare",
        [types.uint(10000000)],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-transfer-external",
        [],
        callerAddress,
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

    const callerAddress = accounts.get("wallet_1")!.address;
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
        callerAddress,
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

    const callerAddress = accounts.get("deployer")!.address;
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
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-token-uri: Can get token URI",
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

    const callerAddress = accounts.get("deployer")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "prepare",
        [types.uint(10000000)],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-token-uri",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-symbol: Can get symbol",
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

    const callerAddress = accounts.get("deployer")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "prepare",
        [types.uint(10000000)],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-symbol",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-name: Can get name",
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

    const callerAddress = accounts.get("deployer")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "prepare",
        [types.uint(10000000)],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-name",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-get-decimals: Can get decimals",
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

    const callerAddress = accounts.get("deployer")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "prepare",
        [types.uint(10000000)],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-get-decimals",
        [],
        callerAddress,
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

    const callerAddress = accounts.get("deployer")!.address;
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
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});
