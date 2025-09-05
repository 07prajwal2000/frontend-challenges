import { clearPubSubStore, publish, pubsubStore, subscribe, unSubscribe } from "./pubsub";

describe("testing pubsub", () => {
  beforeEach(() => {
    clearPubSubStore();
  });
  it("should call the callback 1 time when event fired", () => {
    const callback1 = vi.fn();
    const eventName = "EVENT_1";
    subscribe(eventName, callback1);
    publish(eventName);
    expect(callback1).toHaveBeenCalledTimes(1);
  });
  it("should call the callback 1 time with args when event fired", () => {
    const eventName = "EVENT_1";
    const args = 123;
    const callback = vi.fn(function (params) {
      expect(params).toBe(args);
    });
    subscribe(eventName, callback);
    publish(eventName, args);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it("should not call the callback if event name is different", () => {
    const callback1 = vi.fn();
    const eventName = "EVENT_1";
    const eventName2 = "EVENT_2";
    subscribe(eventName, callback1);
    publish(eventName2);
    expect(callback1).toHaveBeenCalledTimes(0);
  });
  it("should not call the callback if unsubscribed", () => {
    const callback = vi.fn();
    const eventName = "EVENT_1";
    subscribe(eventName, callback);
    publish(eventName);
    unSubscribe(eventName, callback);
    publish(eventName);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it("should have the event name in store when subscribed", () => {
    const eventName = "EVENT_001";
    const callback = vi.fn();
    subscribe(eventName, callback);
    const eventStore = pubsubStore.get(eventName);
    expect(eventStore.size).toBe(1);
    expect(eventStore.has(callback)).toBeTruthy();
  });
});