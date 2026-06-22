# Security Policy

## Scope

This project is a frontend portfolio demo. It has no authentication, database, payment processor or production customer data.

## Reporting

Please report a suspected vulnerability privately through the repository owner's GitHub profile rather than opening a public issue containing exploit details.

## Safe development rules

- never add real API keys or payment credentials;
- do not reuse real customer or retailer data;
- keep checkout explicitly non-transactional;
- review new third-party packages before merging;
- preserve the static fallback when changing the 3D experience;
- do not turn client-side cart totals into a claimed secure payment implementation.
