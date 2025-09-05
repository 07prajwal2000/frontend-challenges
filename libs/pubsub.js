export const pubsubStore = new Map();
export function publish(eventName, ...args) {
  if (!pubsubStore.has(eventName)) return;
  const set = pubsubStore.get(eventName);
  for (const callback of set) {
    callback.call(null, ...args);
  }
}

export function clearPubSubStore() {
  pubsubStore.clear();
}

export function unSubscribe(eventName, refCallback) {
  if (!pubsubStore.has(eventName)) return;
  const set = pubsubStore.get(eventName);
  if (!(set instanceof Set)) return;
  set.delete(refCallback);
}

export function subscribe(eventName, callback) {
  if (typeof callback !== "function") return;
  if (!pubsubStore.has(eventName)) pubsubStore.set(eventName, new Set());
  const set = pubsubStore.get(eventName);
  if (!(set instanceof Set)) return;
  set.add(callback);
}

// const cb1 = function () {
//   console.log("cb1", arguments);
// };
// const cb2 = function () {
//   console.log("cb2", arguments);
// };
// const cb3 = function () {
//   console.log("cb3", arguments);
// };

// subscribe("event1", cb1);
// subscribe("event1", cb2);
// subscribe("event2", cb3);

// console.log("fired event1");
// publish("event1", "event 1");
// console.log("unsubscribed cb1");
// unSubscribe("event1", cb1);
// console.log("fired event1");
// publish("event1", "unsubscribed 1");
// console.log("fired event2");
// publish("event2", "event 2");