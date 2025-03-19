# What is a Schema in PostgreSQL
* Similar to a folder in a hard drive, used to organize our database.
* By default, we have the public schema.
* Every schema has its own copy of tables, which can be used for testing.

## Default Schema
```sql
search_path = '$user', public;
```

## Change Search Path
```sql
SET search_path TO test, public;
```

## Strategy of Isolation
* We run test files in parallel and need to isolate using schemas to prevent overlap.
* Series of steps:
  1. Connect to PostgreSQL as normal.
  2. Create a random string of characters.
  3. Create a new user role with that name.
  4. Create a new schema with that name.
  5. Tell our test file to connect to the database with that name.