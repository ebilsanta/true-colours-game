import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient;

const initializeWebSocketConnection = (roomId, handler) => {
  const socket = new SockJS(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/answer`); // Replace with your WebSocket endpoint

  stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    if (stompClient.connected) {
      stompClient.subscribe('/topic/room-progress' + roomId, (message) => {
        // Handle the incoming message here
        handler(JSON.parse(message.body));
        console.log('Received message:', JSON.parse(message.body));
      });
    }
  });
};

const disconnectWebSocketConnection = () => {
  if (stompClient) {
    stompClient.disconnect();
  }
};

export { initializeWebSocketConnection, disconnectWebSocketConnection };
