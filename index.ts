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
    });

    const res = await chain.run(
      'How man products are existing in the database table?'
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

run();
