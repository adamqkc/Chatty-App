const express = require('express');
const ws = require('ws');

const uuid = require('uuid/v4')

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  const sendDataToClient = function(data)  {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
    })
  }

  const activeUsers = {
    type: 'activeUsers',
    activeUsers: wss.clients.size,
  };

  sendDataToClient(activeUsers);

  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data);

    switch (parsedData.type) {
      case 'postMessage':
        parsedData.type = 'incomingMessage'
        parsedData.id = uuid();
        break;
      case 'postNotification':
        parsedData.type = 'incomingNotification';
        parsedData.id = uuid();
        break;
      default:
        throw new Error("Unknown event type " + parsedData.type);
    }
    
    sendDataToClient(parsedData);
  })
  
  ws.on('close', () => {
    console.log('Client disconnected');

    const activeUsers = {
      type: 'activeUsers',
      activeUsers: wss.clients.size
    };
    
    sendDataToClient(activeUsers);
  });
});