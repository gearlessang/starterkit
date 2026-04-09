# Security Policy

## Pre-Deployment Checklist

Before deploying to mainnet, complete this checklist:

- [ ] All tests pass with 100% coverage
- [ ] Contracts audited by a third party (or internally reviewed)
- [ ] Slither static analysis: `npm run slither` — no high-severity findings
- [ ] Owner address is a multi-sig (Gnosis Safe recommended)
- [ ] Upgrade proxy pattern reviewed (if used)
- [ ] Emergency pause mechanism tested
- [ ] Private key management via hardware wallet or HSM
- [ ] `.env` is **never** committed to version control

## Known Risks

| Risk | Mitigation |
|---|---|
| Centralized owner | Use a multi-sig wallet as owner |
| Reentrancy | `ReentrancyGuard` on all ETH-receiving functions |
| Integer overflow | Solidity 0.8.x built-in overflow checks |
| Unverified contracts | Always verify source on Etherscan |

## Reporting Vulnerabilities

Please **do not** open public GitHub issues for security vulnerabilities.

Send a detailed report to **security@example.com** including:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (optional)

We aim to respond within 48 hours and will credit responsible disclosures.
