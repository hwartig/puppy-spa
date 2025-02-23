import postgres from 'postgres';

const require = process.env.POSTGRES_URL?.includes('localhost') ? false : 'require';
export const connect = () => postgres(process.env.POSTGRES_URL!, { ssl: require });
