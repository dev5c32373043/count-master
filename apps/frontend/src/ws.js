import EventBus from './utils/event-bus';
import toast from 'react-hot-toast';

const eventBus = new EventBus();

function connect() {
  const ws = new WebSocket('ws://localhost:3000', [window.localStorage.getItem('__jwt')]);

  ws.onmessage = ev => {
    const message = JSON.parse(ev.data);
    eventBus.emit(message.event, message.data);
  };

  ws.onclose = event => {
    // Reconnect when the WebSocket is closed unexpectedly
    setTimeout(() => {
      connect();
    }, 3000);
  };

  ws.onerror = ev => {
    toast('Lost connection to the server. Hopefully, not indefinitely.', { icon: '📶' });
  };
}

connect();

export default eventBus;
