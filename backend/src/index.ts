import { config } from 'dotenv';
import App from './app/App';
import Config from './app/Config';
import Env from './app/Env';

config()

async function main() {
    const env = new Env(process.env as any)
    await new App(new Config(env)).start()
}

main().catch(console.error)