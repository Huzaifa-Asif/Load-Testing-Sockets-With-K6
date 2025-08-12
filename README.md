# Socket Server Horizontal Scaling Test

## Introduction

Socket Server Horizontal Scaling Test assesses the horizontal scalability of a Socket Server. The server undergoes incremental loads by consistently adding more clients. This test monitors server metrics like response time, CPU usage, memory usage, and network traffic. The main objectives are to evaluate performance under varying loads, identify potential bottlenecks, and ensure the server's scalability.

## Performance Testing

Performance testing of websockets is carried out using [k6](https://k6.io/) and [Grafana Cloud](https://grafana.com/) to scrutinize the system's behavior under high traffic. The evaluation focuses on identifying performance hindrances by simulating numerous users connecting and communicating with the server.

### Test Cases

#### 1. **Testing Socket Connectivity (`websocket.js`)**
This case checks the user's ability to establish a connection to the server through websockets.


## Execution Instructions

### Setup:
- Install `k6`.
- Configure Grafana Cloud for results visualization.

### Modifications:
- Adjust the script's URL to match your Echo Server's address.

### Running the Test:

```bash
k6 run <script-name>.js
```

## Analysis:
- Review the performance results on Grafana Cloud.
- Adjust server configurations based on insights, if necessary.

## Thresholds and Configurations

Performance thresholds are modifiable in each script's `options` section. As an illustration, in `websocket.js`:

```javascript
thresholds: {
  'http_req_duration': ['p(95)<500']  // Ensure the 95th percentile remains below 500ms.
}
```

## Considerations

Ensure to review and make necessary adjustments to the server's security settings, such as firewalls, to allow for simultaneous connections during testing.
