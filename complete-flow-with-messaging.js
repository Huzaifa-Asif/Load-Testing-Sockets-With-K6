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
        { target: 30, duration: '1m30s' },
        { target: 40, duration: '1m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
  name: 'complete-flow-with-messaging',
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

    response = http.get('https://example.com/ajax/user/spaces', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0c9bd3f0f07c43d8843852fc34429d14',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0c9bd3f0f07c43d8843852fc34429d14-a8728e9f895a42dc-0',
        traceparent: '00-d47e4bbe87802eedf56d402c5d0b27e8-b7daf9d5610e357b-00',
      },
    })

    response = http.get('https://example.com/segment/fallback/27039', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0c9bd3f0f07c43d8843852fc34429d14',
        botid: '24888',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0c9bd3f0f07c43d8843852fc34429d14-b396652497b184ce-0',
        traceparent: '00-d47e4bbe87802eedf56d402c5d0b27e8-b7daf9d5610e357b-00',
      },
    })

    response = http.get('https://example.com/billing/organization/plan', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0c9bd3f0f07c43d8843852fc34429d14',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0c9bd3f0f07c43d8843852fc34429d14-aa0af447579b7932-0',
        traceparent: '00-d47e4bbe87802eedf56d402c5d0b27e8-b7daf9d5610e357b-00',
      },
    })

    response = http.get('https://example.com/billing/organization/plan', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0c9bd3f0f07c43d8843852fc34429d14',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0c9bd3f0f07c43d8843852fc34429d14-97c9a3eede7ebf28-0',
        traceparent: '00-d47e4bbe87802eedf56d402c5d0b27e8-b7daf9d5610e357b-00',
      },
    })
    sleep(0.5)
  })

  group('page_2 - https://example.com/space/24888/dashboard', function () {

    response = http.get('https://example.com/ajax/user/space/24888', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-aa77013e7f047fd9-0',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-f134c98319f49299-01',
      },
    })

    response = http.get('https://example.com/ajax/space/team', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-b87746deaf2bf0fc-0',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-872022e7d37007a9-01',
      },
    })

    response = http.get('https://example.com/ajax/botUser', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-89a6a750b8c5f420-0',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-5fec387991e821c8-01',
      },
    })

    response = http.get('https://example.com/ajax/users/status', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-abb5c2c70830640e-0',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-7791583180175de8-01',
      },
    })

    response = http.get('https://example.com/ajax/dashboard/contact/widget/count', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-a4391e02f9ae5d22-0',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-7e2ba0ddbc3d1f76-01',
      },
    })

    response = http.get(
      'https://1nhqs0r7y4.execute-api.ap-southeast-1.amazonaws.com/staging/notifications/unread-count',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'x-requested-with': 'XMLHttpRequest',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )

    response = http.post(
      'https://example.com/ajax/dashboard/contact/widget',
      '{"status":"pending","lastContactTimestamp":null,"lastContactId":null}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-816ba0bad00df11c-0',
          traceparent: '00-9a9db53a095f7779915c7ac67a6da130-4b2e9b266aabe7d5-01',
        },
      }
    )

    response = http.post(
      'https://example.com/ajax/dashboard/team/members/widget',
      '{"teams":[],"statuses":[]}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-99cdc61ab4dcdf73-0',
          traceparent: '00-9a9db53a095f7779915c7ac67a6da130-6b81fa0aa69912d5-01',
        },
      }
    )

    response = http.post(
      'https://example.com/analytics/conversation',
      '{"date":{"from":"2023-07-28 00:00:00","to":"2023-08-10 23:59:59"},"userIds":[]}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-ba473c04574ec0d0-0',
          traceparent: '00-9a9db53a095f7779915c7ac67a6da130-95518c13316bf30d-01',
        },
      }
    )

    response = http.get(
      'https://example.com/ajax/dashboard/contact/suggested/merge/widget?refresh=true',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'x-requested-with': 'XMLHttpRequest',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-8337546d15f48201-0',
          traceparent: '00-9a9db53a095f7779915c7ac67a6da130-5b81fc7efca7507c-01',
        },
      }
    )

    response = http.get('https://example.com/billing/bsp/disabled-wabas', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-9c877e0f13dbeb30-0',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-a8ac242a27110659-01',
      },
    })

    response = http.options(
      'https://1nhqs0r7y4.execute-api.ap-southeast-1.amazonaws.com/staging/notifications/unread-count',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'authorization,botid,orgid,x-requested-with',
          'access-control-request-method': 'GET',
          origin: 'https://example.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )

    response = http.get('https://example.com/integration/channels', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-8a4c2252c51b2056-0',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-3673348bf257f3e9-01',
      },
    })

    response = http.post('https://example.com/ajax/user/update/activity', null, {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'content-type': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-882b1bf3a13fb9d2-0',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-e964bb5301e8f792-01',
      },
    })

    response = http.post(
      'https://example.com/api/broadcast/history',
      '{"search":"","status":"scheduled","calendar":{},"pagination":{"page":1,"itemsPerPage":5,"sortBy":["broadcasted_at"],"sortDesc":[true]},"userTimezone":"Asia/Kuala_Lumpur"}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
          'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-9128f7aebfee7168-0',
          traceparent: '00-9a9db53a095f7779915c7ac67a6da130-f6d7bf1362513946-01',
        },
      }
    )

    response = http.get('https://example.com/billing/organization/usage', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-a63d4e1d46430671-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-b3c2d826b0fbbe71-01',
      },
    })

    response = http.get('https://example.com/ajax/users/status', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071,sentry-sample_rate=0,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-b3cd1b5cadacf648-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-9a9db53a095f7779915c7ac67a6da130-2c58d98796b4cec2-01',
      },
    })

    response = http.get('https://example.com/workflows/count', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=0b7cc6ae24ef4f91876b63e34234e071',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '0b7cc6ae24ef4f91876b63e34234e071-84bde56f33965817-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-5d0dd7053158d8a628a59342940e3312-31dd8bb66f363e47-00',
      },
    })
    sleep(3.7)
  })

  group('page_3 - https://example.com/space/24888/message', function () {
    response = http.get('https://example.com/ajax/user/space/24888', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=71ed552b3d59481482ac52bfe6461bd9,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fdashboard,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '71ed552b3d59481482ac52bfe6461bd9-9d39e0bb29879aea-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.get('https://example.com/ajax/mtm', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=71ed552b3d59481482ac52bfe6461bd9,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fdashboard,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '71ed552b3d59481482ac52bfe6461bd9-8ca48c4fbc311a8f-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.get('https://example.com/workflows', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=71ed552b3d59481482ac52bfe6461bd9,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fdashboard,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '71ed552b3d59481482ac52bfe6461bd9-aa9c4a3bb5049470-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.get(
      'https://1nhqs0r7y4.execute-api.ap-southeast-1.amazonaws.com/staging/notifications/preferences',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'x-requested-with': 'XMLHttpRequest',
          'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          timezone: 'Asia/Karachi',
        },
      }
    )

    response = http.get('https://example.com/contact-inbox', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=71ed552b3d59481482ac52bfe6461bd9,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fdashboard,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '71ed552b3d59481482ac52bfe6461bd9-a4a271643502670b-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.options(
      'https://1nhqs0r7y4.execute-api.ap-southeast-1.amazonaws.com/staging/notifications/preferences',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers':
            'authorization,botid,orgid,timezone,x-requested-with,x-socket-id',
          'access-control-request-method': 'GET',
          origin: 'https://example.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )

    response = http.get('https://example.com/conversation/count/standard', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=71ed552b3d59481482ac52bfe6461bd9,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fdashboard,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '71ed552b3d59481482ac52bfe6461bd9-85d64ca491abca62-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.get('https://example.com/conversation/count/team', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=71ed552b3d59481482ac52bfe6461bd9,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fdashboard,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '71ed552b3d59481482ac52bfe6461bd9-8be0fab5d3dd6f1f-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.post(
      'https://example.com/conversation',
      '{"page":1,"filter":{"$and":[{"category":"contactField","field":"assigneeUserId","operator":"isEqualTo","value":28064}]},"search":"","timezone":"Asia/Karachi","filterStatus":null,"sortBy":"newest","searchType":null,"highlight":{"pre_tags":["<span class=\\"message--highlight\\">"],"post_tags":["</span>"]}}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest',
          'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=71ed552b3d59481482ac52bfe6461bd9,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fdashboard,sentry-sampled=false',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '71ed552b3d59481482ac52bfe6461bd9-9caee34c13999576-0',
          timezone: 'Asia/Karachi',
          traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
        },
      }
    )

    response = http.get('https://example.com/ajax/custom_field', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=71ed552b3d59481482ac52bfe6461bd9,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fdashboard,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '71ed552b3d59481482ac52bfe6461bd9-b0df27711aa8fd7b-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })
  })

  group('page_4 - https://example.com/space/24888/message/13680807', function () {
    response = http.get('https://example.com/contact/13680807', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fmessage,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-a0ca7d73522dc757-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.get(
      'https://example.com/ajax/organization/space/custom_field/ordering',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'x-requested-with': 'XMLHttpRequest',
          'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fmessage,sentry-sampled=false',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-afdb26bf0ac66a78-0',
          timezone: 'Asia/Karachi',
          traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
        },
      }
    )

    response = http.get('https://example.com/ajax/tag', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fmessage,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-b65de9b180031017-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.get('https://example.com/ajax/contact/suggested/merge/13680807', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fmessage,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-af0ab4b38a85176c-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.get('https://example.com/messaging/ajax/ip/country', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fmessage,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-8acabf406dcae65c-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.get('https://example.com/chat-activity/chat?contactId=13680807', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fmessage,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-acadc104aaec0103-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })

    response = http.get('https://example.com/conversation/notes/setting', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7,sentry-sample_rate=0,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fmessage,sentry-sampled=false',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-b9b6175e207c710d-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-11942256463799dc21607e5f978ae340-277f731f01b0f110-00',
      },
    })
    sleep(5.3)

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

    response = http.get('https://example.com/workspace/snippet/search/message?query=hello', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-b497823afc0af8a5-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-fb107c0f8b2875aa244f621e9062418f-520be5c4ba279396-00',
      },
    })
    sleep(4.2)

    response = http.post(
      'https://example.com/messaging/ajax/message/send',
      '{"contactId":13680807,"contactChannelId":58888137,"messageType":"text","payload":{"message":{"type":"text","text":"automated testing"},"sender":{"source":"user","type":"message","userId":28064,"teamId":494},"channel":{"id":36243,"source":"facebook"},"status":[],"meta":{"traceId":"kvral"}}}',
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
          'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-bd2197dc92ed2474-0',
          timezone: 'Asia/Karachi',
          traceparent: '00-0741f7a913a3dde699dc374496ff63cd-3a0bf4b7d22c1c65-00',
        },
      }
    )
    console.log("Message Send Response: ", response);
    sleep(0.6)

    response = http.get(
      'https://example.com/workspace/snippet/search/message?query=automated+testing',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${vars['idToken']}`,
          'x-requested-with': 'XMLHttpRequest',
          'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
          baggage:
            'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7',
          botid: '24888',
          orgid: '27039',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-be1d69e3e1540a4d-0',
          timezone: 'Asia/Karachi',
          traceparent: '00-1fccc94feab6dc85a7979a947453ac4c-e309fcedc0cc1ee4-00',
        },
      }
    )
    sleep(4.1)

    response = http.get('https://example.com/billing/organization/usage', {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${vars['idToken']}`,
        'x-requested-with': 'XMLHttpRequest',
        'x-socket-id': '0M-sCJHWA-AhfcWPAAZ5',
        baggage:
          'sentry-environment=staging,sentry-release=1691640057,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=4c35e6fe47da4ecbb4f227c6b6df76b7',
        botid: '24888',
        orgid: '27039',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sentry-trace': '4c35e6fe47da4ecbb4f227c6b6df76b7-871bf9542eb2d314-0',
        timezone: 'Asia/Karachi',
        traceparent: '00-283fac623bd0b512ffe28d7bf3450bab-71cc97961edefd80-00',
      },
    })
  })

  group(
    'page_5 - https://example.com/auth/logout?state=eyJraWQiOiI1T0tcL2ZRSk9BbzVjRHhmK2U0SHFYZ2pKeEUyQW1UOGVWTHJzYXVGVHJpRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4OTM4MDg1MS01ZGE3LTQ4NDItYmJmZi0zMTk0NWIyMTM3YzEiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX3d5a2d6VkZEMiIsInNlc3Npb25faWQiOiI2ODE1MGEzMy01NzQ2LTRiZmMtODUwZC05ZDVlMDY3YzBjNjAiLCJjb2duaXRvOnVzZXJuYW1lIjoiODkzODA4NTEtNWRhNy00ODQyLWJiZmYtMzE5NDViMjEzN2MxIiwib3JpZ2luX2p0aSI6ImJlMjU5ZmVmLTc3MzgtNGZhNi05MThkLWU4OGE3YzI5M2MxNCIsImF1ZCI6IjI5YjM3OWNuMzQyMTVtdWYxNGk0YjNlOXM0IiwiZXZlbnRfaWQiOiI0YjM0MzdkOS05YzNlLTQzZGQtYWY0OC1kY2IzNjUzMjZmNDYiLCJ1c2VyX2lkIjoiMjgwNjQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5MTY0MzEyOCwiZXhwIjoxNjkxNjQzNDI4LCJpYXQiOjE2OTE2NDMxMjgsImp0aSI6IjQxYWVhMTdlLTBhMzQtNDFkMC1hMDdkLWQwYzVhODk1MmUxMyIsImVtYWlsIjoiaHV6YWlmYUByb2NrZXRib3RzLmlvIn0.Ms_ohmayh77RHyhms-GF-_KPVRnCz5nk_1ewn_EZB1WAPIjiUAmYbraz_WU_zqZ0ugwONLT7mYVbhI467aVdHTuMCstIuyWhjB9BLy5TG_RUzdZAhXt8l8T5RGcjhf-Gvu0sgxdfDanTtuMU_ezAg9evFnI8GKD9oi7InYwXuGePmGP2BaZZRuJCpHQpoBYVQPhWGh9UvqCXIUlw5oJ5lWwYOlT3iNqvJM22cFygBZ4I5ocTDrJsShlVapRp7v0UMA4RI1QgZcKzCe2E_GFBORdl3VnukwLEAQ8gDhQbiLrdhljEXgLGOLObb6oD1uE-MR3bcz48NfLx1PZABCIqzA',
    function () {
      response = http.get(
        'https://example.com/auth/logout?state=eyJraWQiOiI1T0tcL2ZRSk9BbzVjRHhmK2U0SHFYZ2pKeEUyQW1UOGVWTHJzYXVGVHJpRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4OTM4MDg1MS01ZGE3LTQ4NDItYmJmZi0zMTk0NWIyMTM3YzEiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX3d5a2d6VkZEMiIsInNlc3Npb25faWQiOiI2ODE1MGEzMy01NzQ2LTRiZmMtODUwZC05ZDVlMDY3YzBjNjAiLCJjb2duaXRvOnVzZXJuYW1lIjoiODkzODA4NTEtNWRhNy00ODQyLWJiZmYtMzE5NDViMjEzN2MxIiwib3JpZ2luX2p0aSI6ImJlMjU5ZmVmLTc3MzgtNGZhNi05MThkLWU4OGE3YzI5M2MxNCIsImF1ZCI6IjI5YjM3OWNuMzQyMTVtdWYxNGk0YjNlOXM0IiwiZXZlbnRfaWQiOiI0YjM0MzdkOS05YzNlLTQzZGQtYWY0OC1kY2IzNjUzMjZmNDYiLCJ1c2VyX2lkIjoiMjgwNjQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5MTY0MzEyOCwiZXhwIjoxNjkxNjQzNDI4LCJpYXQiOjE2OTE2NDMxMjgsImp0aSI6IjQxYWVhMTdlLTBhMzQtNDFkMC1hMDdkLWQwYzVhODk1MmUxMyIsImVtYWlsIjoiaHV6YWlmYUByb2NrZXRib3RzLmlvIn0.Ms_ohmayh77RHyhms-GF-_KPVRnCz5nk_1ewn_EZB1WAPIjiUAmYbraz_WU_zqZ0ugwONLT7mYVbhI467aVdHTuMCstIuyWhjB9BLy5TG_RUzdZAhXt8l8T5RGcjhf-Gvu0sgxdfDanTtuMU_ezAg9evFnI8GKD9oi7InYwXuGePmGP2BaZZRuJCpHQpoBYVQPhWGh9UvqCXIUlw5oJ5lWwYOlT3iNqvJM22cFygBZ4I5ocTDrJsShlVapRp7v0UMA4RI1QgZcKzCe2E_GFBORdl3VnukwLEAQ8gDhQbiLrdhljEXgLGOLObb6oD1uE-MR3bcz48NfLx1PZABCIqzA',
        {
          headers: {
            'upgrade-insecure-requests': '1',
            'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
          },
        }
      )
    }
  )
}
