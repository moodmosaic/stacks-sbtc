(define-constant err-not-token-owner (err u4))

(define-private (assert-eq (result (response bool uint)) (compare (response bool uint)) (message (string-ascii 100)))
	(ok (asserts! (is-eq result compare) (err message)))
)

(define-private (assert-eq-string (result (response (string-ascii 32) uint)) (compare (response (string-ascii 32) uint)) (message (string-ascii 100)))
	(ok (asserts! (is-eq result compare) (err message)))
)

(define-private (assert-eq-uint (result (response uint uint)) (compare (response uint uint)) (message (string-ascii 100)))
	(ok (asserts! (is-eq result compare) (err message)))
)

(define-public (prepare (amount uint) (recipient principal))
	(begin
		(try! (contract-call? .sbtc-testnet-debug-controller set-protocol-contract (as-contract tx-sender) true))
		(try! (contract-call? .sbtc-token protocol-mint amount recipient))
		(ok true)
	)
)

;; --- SIP010 tests

;; @name Token owner can transfer their tokens
;; @caller wallet_1
(define-public (test-transfer (recipient principal))
	(contract-call? .sbtc-token transfer u100 tx-sender recipient none)
)

;; @name Cannot transfer someone else's tokens
;; @caller wallet_1
(define-public (test-transfer-someone-elses-tokens (other-sender principal))
	(assert-eq (contract-call? .sbtc-token transfer u100 other-sender tx-sender none) err-not-token-owner "Should have failed")
)

;; @name Can get name
(define-public (test-get-name)
	(assert-eq-string (contract-call? .sbtc-token get-name) (ok "sBTC Mini") "Name does not match")
)

;; @name Can get symbol
(define-public (test-get-symbol)
	(assert-eq-string (contract-call? .sbtc-token get-symbol) (ok "sBTC") "Name does not match")
)

;; @name Can get decimals
(define-public (test-get-decimals)
	(assert-eq-uint (contract-call? .sbtc-token get-decimals) (ok u8) "Decimals do not match")
)

;; @name Can user balance
(define-public (test-get-balance (wallet principal))
	(assert-eq-uint (contract-call? .sbtc-token get-balance wallet) (ok u10000000) "Balance does not match")
)

;; @name Can get total supply
(define-public (test-get-total-supply)
	(assert-eq-uint (contract-call? .sbtc-token get-total-supply) (ok (* u2 u10000000)) "Total supply does not match")
)

;; @name Can get token URI
(define-public (test-get-token-uri)
	(ok (asserts! (is-eq (contract-call? .sbtc-token get-token-uri) (ok none)) (err "Token URI is not none")))
)
