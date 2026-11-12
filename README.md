# Aptdot Developer Datasets

Free JSON test datasets and fixtures for developers, each with a JSON Schema (Draft 2020-12). Use them to seed databases, test parsers and validators, mock APIs and write repeatable unit tests.

[![Validate datasets](https://github.com/mkchd25/aptdot-datasets/actions/workflows/validate.yml/badge.svg)](https://github.com/mkchd25/aptdot-datasets/actions/workflows/validate.yml)
[![License: CC0-1.0](https://img.shields.io/badge/license-CC0--1.0-lightgrey.svg)](LICENSE)

Every dataset has a page on [aptdot.com](https://www.aptdot.com/datasets/) with a preview, field explanations and code examples. Each one is checked against its schema on every change.

## Datasets

| Dataset | What's inside | File | Guide |
| :--- | :--- | :--- | :--- |
| HTTP Security Headers | 9 response headers (CSP, HSTS, Permissions-Policy, COOP/COEP/CORP and more) with baseline and hardened values, browser support and config snippets for Nginx, Apache, Next.js, Vercel, Netlify, Caddy and Helmet | [http-security-headers.json](data/v1/http-security-headers.json) | [Page](https://www.aptdot.com/datasets/http-security-headers/) |
| RBAC & User Permissions | 25 synthetic multi-tenant users, 6 role inheritance trees and 12 authorization test cases with expected allow or deny | [synthetic-rbac-users.json](data/v1/synthetic-rbac-users.json) | [Page](https://www.aptdot.com/datasets/synthetic-rbac-users/) |
| JWT Claims & Test Tokens | The 7 RFC 7519 registered claims, plus 8 signed test tokens: 2 valid and 6 that verification code must reject | [jwt-claims-reference.json](data/v1/jwt-claims-reference.json) | [Page](https://www.aptdot.com/datasets/jwt-claims-reference/) |
| MCP Server Configs | 8 ready-to-paste `mcpServers` configs with config file paths for Claude Desktop, Cursor and VS Code | [mcp-server-configs.json](data/v1/mcp-server-configs.json) | [Page](https://www.aptdot.com/datasets/mcp-server-configs/) |
| CI/CD Pipeline Templates | 6 secure-by-default templates for GitHub Actions, GitLab CI/CD, Docker Compose, Kubernetes and AWS ECS Fargate, as JSON and paste-ready YAML | [cicd-pipeline-manifests.json](data/v1/cicd-pipeline-manifests.json) | [Page](https://www.aptdot.com/datasets/cicd-pipeline-manifests/) |
| FHIR R4 Patient Records | An HL7 FHIR R4 Bundle of 10 synthetic Patient resources, including a newborn with a guardian, a deceased patient and an unidentified trauma patient | [synthetic-fhir-patient-records.json](data/v1/synthetic-fhir-patient-records.json) | [Page](https://www.aptdot.com/datasets/synthetic-fhir-patient-records/) |
| E-Commerce Product Catalog | 50 fictional products and 135 variants in 5 categories, with stock, sale prices, edge cases and a CSV-ready flat view | [ecommerce-product-catalog.json](data/v1/ecommerce-product-catalog.json) | [Page](https://www.aptdot.com/datasets/ecommerce-product-catalog/) |
| IANA Time Zones | All 344 zones and 253 aliases from tzdb 2026e, with UTC offsets, clock changes for the next 12 months and POSIX TZ strings | [iana-timezones-reference.json](data/v1/iana-timezones-reference.json) | [Page](https://www.aptdot.com/datasets/iana-timezones-reference/) |
| Country & Currency Codes | All 249 ISO 3166-1 countries and 178 ISO 4217 currencies, with minor units and the decimals Stripe, Adyen and PayPal use | [country-currency-codes-reference.json](data/v1/country-currency-codes-reference.json) | [Page](https://www.aptdot.com/datasets/country-currency-codes-reference/) |
| Design Color Tokens | An original 66-colour OKLCH palette with WCAG contrast for every step, light and dark tokens, CSS variables and a Tailwind CSS v4 theme | [design-system-color-tokens.json](data/v1/design-system-color-tokens.json), [.tokens.json](data/v1/design-system-color-tokens.tokens.json) (W3C DTCG) | [Page](https://www.aptdot.com/datasets/design-system-color-tokens/) |

Every data file has a matching `.schema.json` next to it in [`data/v1/`](data/v1/).

Personal data: the user, patient and product records are invented for testing. None of them describe real people. Email addresses use `example.com` and SSNs use the never-issued `000` prefix.

## Use a dataset

Download any file from [`data/v1/`](data/v1/), or load it straight into a test. Use a release tag in the URL so your tests never change unexpectedly:

```js
// Node.js 18+
const url = 'https://raw.githubusercontent.com/mkchd25/aptdot-datasets/v1.0.0/data/v1/iana-timezones-reference.json';
const data = await (await fetch(url)).json();
console.log(data.timezones.length); // 344
```

```python
# Python 3
import json, urllib.request

url = "https://raw.githubusercontent.com/mkchd25/aptdot-datasets/v1.0.0/data/v1/country-currency-codes-reference.json"
data = json.load(urllib.request.urlopen(url))
print(len(data["countries"]))  # 249
```

For tests that must run offline, copy the file into your project instead.

## Validate

```bash
npm ci
npm test
```

This checks every file against its schema. The same check runs on GitHub for every change.

## Versioning

Files in `data/v1/` keep their structure: fields may be added and values updated, but nothing is removed or renamed. A change that would break existing code goes into a new `data/v2/` folder. Each file records its own version and date in `metadata`. See the [releases](https://github.com/mkchd25/aptdot-datasets/releases).

## License

The datasets are dedicated to the public domain under [CC0 1.0 Universal](LICENSE): use them for anything, including commercial projects, without asking or giving credit.

One exception: in `country-currency-codes-reference.json`, the names, symbols, regions and cash rounding taken from Unicode CLDR are under the Unicode License v3. If you redistribute those values, keep the notice in [NOTICE](NOTICE).

To cite the datasets, use the **Cite this repository** button, which reads [CITATION.cff](CITATION.cff).

## Related

- [JWT Decoder & Verifier](https://www.aptdot.com/tools/jwt-decoder/): check the test tokens in your browser ([source](https://github.com/mkchd25/aptdot-jwt-decoder))
- [Aptdot JSON Suite](https://github.com/mkchd25/aptdot-json-suite): format the files or convert them to CSV, YAML, TypeScript or Python
- Found a mistake in the data? [Open an issue](https://github.com/mkchd25/aptdot-datasets/issues).
