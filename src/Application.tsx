import Nullstack, { NullstackClientContext } from 'nullstack';
import Popup from './Popup';
import './Application.css';

class Application extends Nullstack {

  prepare({ page, project }: NullstackClientContext) {
    page.locale = 'en-US';
    page.title = `${project.name} - Welcome to Nullstack!`;
    page.description = `${project.name} was made with Nullstack`;
  }

  render() {
    return (
      <main>
        <Popup route="*" />
      </main>
    )
  }

}

export default Application;