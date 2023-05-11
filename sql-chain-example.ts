/**
 * This file demonstrates how to use the langchain library to perform natural language processing on a SQLite database using TypeScript.
 * It defines a function called `run` that connects to a SQLite database file called `northwind.db`, initializes a `SqlDatabase` object using the `langchain/sql_db` library, and creates a `SqlDatabaseChain` object using the `langchain/chains` library.
 * The `SqlDatabaseChain` object is initialized with an `OpenAI` object and the `SqlDatabase` object created earlier.
 * The `OpenAI` object is initialized with an API key and a temperature of 0. The temperature parameter controls the randomness of the generated text.
 * Finally, the `run` method of the `SqlDatabaseChain` object is called with a natural language query as a parameter. The query is "How many products are existing in the database table?". The result of the query is logged to the console.
 * Resources: 
 * https://js.langchain.com/docs/modules/models/llms/integrations
 * https://js.langchain.com/docs/modules/chains/other_chains/sql
*/
import {DataSource} from 'typeorm';
import {OpenAI} from 'langchain/llms/openai';
import {SqlDatabase} from 'langchain/sql_db';
import {SqlDatabaseChain} from 'langchain/chains';
import * as dotenv from 'dotenv';
import {env} from 'process';

dotenv.config();

export const run = async () => {
  try {
    const datasource = new DataSource({
      type: 'sqlite',
      database: 'northwind.db',
    });

    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: datasource,
      includesTables: ['Products'],
    });

    const chain = new SqlDatabaseChain({
      llm: new OpenAI({temperature: 0, openAIApiKey: env.OPENAI_API_KEY}),
      database: db,
      verbose: true, // verbose is set to true to log the generated SQL query to the console
    });

    const res = await chain.run(
      'How many products are existing in the database table?'
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

run();