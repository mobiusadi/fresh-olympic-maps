// app.config.js - Final Corrected Version

module.exports = {
  expo: {
    name: "fresh-olympic-maps",
    slug: "fresh-olympic-maps",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    // The "extra" object contains our dynamic API key
    extra: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_Maps_API_KEY
    }
  }
};