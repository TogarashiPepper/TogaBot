import { token } from './config.json';
import TogaClient from './util/TogaClient';

const client = new TogaClient();
client.login(token);
