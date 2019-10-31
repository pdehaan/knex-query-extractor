# knex-query-extractor

Extract async Knex.js queries from a file.

## USAGE

The script takes two command line arguments:
1. The local file to scan for Knex.js queries.
1. The SQL methods that you want to filter [optional].

```js
npx pdehaan/knex-query-extractor ./db/DB.js insert,select
```

The previous example will scan the ./db/DB.js file and only return "INSERT" or "SELECT" queries. If you don't pass any SQL methods to filter, all methods are returned (INSERT, SELECT, UPDATE, DELETE).
