import { Subject, ReplaySubject } from 'rxjs';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();
// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  tap(_ => console.log('executed')),
  pluck('url'),
  // defaults to last 1 value
  shareReplay()
);
// requires initial subscription
const initialSubscriber = lastUrl.subscribe(console.log)
// simulate route change
// logged: 'executed', 'my-path'
routeEnd.next({data: {}, url: 'my-path'});
// logged: 'my-path'
const lateSubscriber = lastUrl.subscribe(console.log);