export const trackEvent = (eventName, payload = {}) => {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event: eventName,
    ...payload,
    timestamp: new Date().toISOString(),
  };

  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[TrustShield Analytics]", eventPayload);
  }
};
