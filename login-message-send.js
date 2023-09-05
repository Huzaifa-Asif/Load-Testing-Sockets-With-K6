import { sleep, group } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
  ext: {
    loadimpact: {
    // distribution of load zones, for Cloud execution - I specified Asia regions as our product is mostly used mostly in Asia
    // This load distrubution is used for local test only  
    //   distribution: {
    //     'amazon:cn:hong kong': { loadZone: 'amazon:cn:hong kong', percent: 17 },
    //     'amazon:in:mumbai': { loadZone: 'amazon:in:mumbai', percent: 17 },
    //     'amazon:jp:osaka': { loadZone: 'amazon:jp:osaka', percent: 16 },
    //     'amazon:jp:tokyo': { loadZone: 'amazon:jp:tokyo', percent: 17 },
    //     'amazon:kr:seoul': { loadZone: 'amazon:kr:seoul', percent: 16 },
    //     'amazon:sg:singapore': { loadZone: 'amazon:sg:singapore', percent: 17 },
    //    },
    distribution: {
        'amazon:sg:singapore': { loadZone: 'amazon:sg:singapore', percent: 100 },
       },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 800, duration: '1m' },
        { target: 2000, duration: '2m' },
        { target: 0, duration: '20s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
  name: 'login-message-send',
}

export function scenario_1() {
  let response

  const vars = {}

  group('page_1 - https://example.com/user/login', function () {
    response = http.post(
      'https://example.com/auth/login',
      '{"email":"huzaifa8580@gmail.com","password":"Test8978@"}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0c9bd3f0f07c43d8843852fc34429d14',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '0c9bd3f0f07c43d8843852fc34429d14-8f21940d790cea68-0',
          traceparent: '00-631594d9ab2fc710e00af4ede249e988-8bfbe64a7afb5ad2-00',
        },
      }
    )

    vars['idToken'] = jsonpath.query(response.json(), '$.data.idToken')[0]
    sleep(2)
    response = http.get('https://example.com/ajax/user/organizations', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0c9bd3f0f07c43d8843852fc34429d14',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0c9bd3f0f07c43d8843852fc34429d14-a80db79fb93541d6-0',
        traceparent: '00-d47e4bbe87802eedf56d402c5d0b27e8-b7daf9d5610e357b-00',
      },
    })
    sleep(2)
  })

  group('page_2 - https://example.com/space/24888/message/13680807', function () {

    response = http.post(
      'https://example.com/messaging/ajax/message/send',
      '{"contactId":13680807,"contactChannelId":58888137,"messageType":"text","payload":{"message":{"type":"text","text":"hello"},"sender":{"source":"user","type":"message","userId":28064,"teamId":494},"channel":{"id":36243,"source":"facebook"},"status":[],"meta":{"traceId":"klo5g"}}}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
          'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-9f3538e0830ef808-0',
          timezone: 'Asia/Karachi',
          traceparent: '00-b33d825db73e54e14b8afc50a435c677-b96ff22be4389719-00',
        },
      }
    )

    console.log("Message Send Response: ", response);
    sleep(5.0)
  })
}
