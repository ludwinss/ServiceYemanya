import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'development';

const configEnv = dotenv.config({ path: `.env.${NODE_ENV}` })

if (configEnv.error) {
    throw new Error(configEnv.error.message);
}

export default configEnv;
