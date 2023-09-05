import ws from 'k6/ws';
import { check } from 'k6';

export let options = {
    stages: [
      { duration: '2m', target: 10 },  // Ramp up to 10 VUs in 2 minutes
      { duration: '3m', target: 90 },  // Stay at 90 VUs for 3 minutes
      { duration: '2m', target: 0 },   // Ramp down to 0 VUs in 2 minutes
    ],
    thresholds: {
      'http_req_duration': ['p(95)<500'],  // Define your performance threshold here
    },
    ext: {
      loadimpact: {
        distribution: {
          loadZone1: { loadZone: 'amazon:us:ashburn', percent: 100 },
        },
      },
    },
    name: 'laravel-echo-testing', // Set the name of the test case
  };
  
export default function () {
  const url = 'wss://example.com/socket.io/?EIO=3&transport=websocket';
  const params = {};
    const response = ws.connect(url, params, function (socket) {
      socket.on('open', function open() {
        console.log('connected');
        
        // You can send your test data here, similar to your original script
        socket.send(Date.now());

        socket.setInterval(function timeout() {
          socket.ping();
          console.log('Pinging every 1sec (setInterval test)');
        }, 1000);
      });

      socket.on('ping', () => console.log('PING!'));
      socket.on('pong', () => console.log('PONG!'));
      socket.on('pong', () => {
        // Multiple event handlers on the same event
        console.log('OTHER PONG!');
      });

      socket.on('close', () => console.log('disconnected'));

      socket.on('error', (e) => {
        if (e.error() != 'websocket: close sent') {
          console.log('An unexpected error occurred: ', e.error());
        }
      });

      socket.setTimeout(function () {
        console.log('2 seconds passed, closing the socket');
        socket.close();
      }, 2000);
    });
  check(response, { 'status is 101': (r) => r && r.status === 101 });
}
