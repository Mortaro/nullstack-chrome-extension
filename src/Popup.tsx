import Nullstack, { NullstackClientContext, NullstackServerContext } from 'nullstack';

interface PopupProps {
  route?: string
}

class Popup extends Nullstack<PopupProps> {

  alive = false

  static async serverFunction({ environment }: NullstackServerContext): Promise<boolean> {
    const alive = environment.server
    console.log({ alive })
    return alive
  }

  async clientFunction() {
    if (!chrome?.tabs) {
      console.error("This button should be only used in the extension popup!")
      return
    }

    const alive = await Popup.serverFunction({})

    const ping = (alive) => {
      console.log({ alive })
      if (!alive) return
      document.body.innerText = "Server is Alive"
      return true
    }

    const pong = ([{ result: alive }]) => {
      console.log({ alive })
      this.alive = alive
    }

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [alive],
      function: ping,
    }, pong);
  }

  render({ project }: NullstackClientContext) {
    return (
      <section>
        <h1> ${project.name} </h1>
        <button onclick={this.clientFunction}>
          Test server
        </button>
        {this.alive && <p> Extension and server are Alive </p>}
      </section>
    )
  }

}

export default Popup;