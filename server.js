import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

context.worker.enabled = false

context.start = async function start() {
  // https://nullstack.app/application-startup
}

export default context;