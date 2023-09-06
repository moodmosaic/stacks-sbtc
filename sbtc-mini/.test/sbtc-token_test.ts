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
  name:
    "test-protocol-unlock-external: Non-protocol cannot unlock locked user tokens",
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
        "test-protocol-unlock-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-unlock: Protocol can unlock locked user tokens",
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
        "test-protocol-unlock",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-transfer-external: Non-protocol cannot lock user tokens",
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
        "prepare-and-revoke-access",
        [],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-transfer-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-transfer: Protocol can transfer user tokens",
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
        "test-protocol-transfer",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name:
    "test-protocol-set-token-uri-external: Non-protocol cannot set asset token URI",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const callerAddress = accounts.get("deployer")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-set-token-uri-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-set-token-uri: Protocol can set asset token URI",
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
        "prepare-add-test-to-protocol",
        [],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-set-token-uri",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name:
    "test-protocol-set-symbol-external: Non-protocol cannot set asset symbol",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const callerAddress = accounts.get("deployer")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-set-symbol-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-set-symbol: Protocol can set asset symbol",
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
        "prepare-add-test-to-protocol",
        [],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-set-symbol",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-set-name-external: Non-protocol cannot set asset name",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const callerAddress = accounts.get("deployer")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-set-name-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-set-name: Protocol can set asset name",
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
        "prepare-add-test-to-protocol",
        [],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-set-name",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name:
    "test-protocol-mint-many-external: Non-protocol contracts cannot mint tokens",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const callerAddress = accounts.get("deployer")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-mint-many-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-mint-many: Protocol can mint tokens",
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
        "prepare-add-test-to-protocol",
        [],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-mint-many",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name:
    "test-protocol-mint-external: Non-protocol contracts cannot mint tokens",
  fn(chain: Chain, accounts: Map<string, Account>) {
    const callerAddress = accounts.get("deployer")!.address;
    chain.mineBlock([
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-mint-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-mint: Protocol can mint tokens",
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
        "prepare-add-test-to-protocol",
        [],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-mint",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-lock-external: Non-protocol cannot lock user tokens",
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
        "prepare-and-revoke-access",
        [],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-lock-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-lock: Protocol can lock user tokens",
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
        "test-protocol-lock",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name:
    "test-protocol-burn-locked-external: Non-protocol cannot burn locked user tokens",
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
        "test-protocol-burn-locked-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-burn-locked: Protocol can burn locked user tokens",
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
        "test-protocol-burn-locked",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-burn-external: Non-protocol cannot burn user tokens",
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
        "prepare-and-revoke-access",
        [],
        deployer.address,
      ),
      Tx.contractCall(
        "sbtc-token_test",
        "test-protocol-burn-external",
        [],
        callerAddress,
      ),
    ]).receipts.map(({ result }) => result.expectOk());
  },
});

Clarinet.test({
  name: "test-protocol-burn: Protocol can burn user tokens",
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
        "test-protocol-burn",
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
  name: "test-get-locked-balance: Can read locked user balance",
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
        "test-get-locked-balance",
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
  name:
    "test-get-balance-includes-locked-tokens: User balance includes locked tokens",
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
        "test-get-balance-includes-locked-tokens",
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
