import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN as string);

export const track = (eventName: string, eventProperties?: any) => {
  return;
  mixpanel.track(eventName, eventProperties);
};
