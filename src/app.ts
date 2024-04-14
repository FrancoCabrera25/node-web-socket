import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log("Client connected");
  ws.on('error', console.error);

  ws.on('message', function message(data) {
   
    // a todos:
/*     wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data.toString().toUpperCase(), { binary: false });
        }
      }); */

      //a todos menos al que envia el mensaje
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: false });
        }
      });
   /*  ws.send(data.toString().toUpperCase()) */
  });

 /*  ws.send('Hola desde el servidor'); */

  ws.on("close", () => {
    console.log("Client disconnected");
  })
});
