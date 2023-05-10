import {DataSource} from 'typeorm';
import {OpenAI} from 'langchain/llms/openai';
import {SqlDatabase} from 'langchain/sql_db';
import {SqlDatabaseChain} from 'langchain/chains';
import * as dotenv from 'dotenv';

dotenv.config();

export const run = async () => {
  const datasource = new DataSource({
    type: 'sqlite',
    database: 'northwind.db',
  });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
    includesTables: ['Products'],
  });

  const chain = new SqlDatabaseChain({
    llm: new OpenAI({temperature: 0}),
    database: db,
  });

  const res = await chain.run('What are the products listed in the database?');
  console.log(res);
  // There are 3503 tracks.
};
