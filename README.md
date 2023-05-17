# DB Reader LangChain

This is an example projects to check how lang chain can be used to interact with different kinds of databases like SQL to explain the database.

General Resources:
- [SQLite Examples Langchain](https://python.langchain.com/en/latest/modules/chains/examples/sqlite.html)

# Steps to get started

1. Clone the repo with `git clone`
2. Create a .env file on root folder
3. Add a variable OPENAI_API_KEY=your_open_api_key
4. Run `npm i`
5. Run the solution with `npx ts-node sql-chain-example.ts`

# Hints

Currently its using davinci-003. Due to the reduced max token size, I would always incorporate the tables that you want to include for your prompts.

You can to that by tweaking the code here:
```typescript
includesTables: ['Products', 'Orders', 'Order Details'],
```
I am working on a solution to make it easier.

# Ideas to enhance this project

- Add reading git repos to search for particular solutions or libraries.
- Add OpenAPI Chain to query against OpenAPI definitions.
