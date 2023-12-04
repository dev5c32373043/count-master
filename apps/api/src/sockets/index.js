import WebSocket from 'ws';
import Redis from 'ioredis';

import { verifyToken } from '@/auth/services/auth.service';
import { REDIS_HOST, REDIS_PORT } from '@/conf';
import { logger } from '@/utils';

let wss = null;

function setup(server) {
  wss = new WebSocket.Server({ server });
  const redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });

  wss.on('connection', (ws, req) => {
    const jwt = req.headers['sec-websocket-protocol'];
    if (!jwt) {
      ws.close();
      return;
    }

    try {
      const user = verifyToken(jwt);
      const clientId = user.sub;

      redis.sadd('clients', clientId);

      ws.on('close', () => {
        redis.srem('clients', clientId);
      });

      ws.clientId = clientId;
    } catch (err) {
      logger.error(err);
      ws.close();
    }
  });
}

export function sendEvent(clientId, event, data) {
  let client = null;

  for (const ws of wss.clients) {
    if (ws.readyState !== WebSocket.OPEN || ws.clientId !== clientId) continue;
    client = ws;
    break;
  }

  if (!client) return;
  client.send(JSON.stringify({ event, data }));
}

export default setup;
