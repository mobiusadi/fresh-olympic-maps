// app.config.js

module.exports = ({ config }) => {
  // config contains all the settings from your original app.json
  // We add our dynamic value to it.
  return {
    ...config,
    expo: {
      ...config.expo,
      extra: {
        ...config.expo.extra,
        // This securely reads the variable from the Cloudflare build environment
        googleMapsApiKey: process.env.EXPO_PUBLIC_Maps_API_KEY,
      },
    },
  };
};