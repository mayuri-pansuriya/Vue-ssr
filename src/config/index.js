const config = {
  development: {
    BASE_API: process.env.VUE_APP_BASE_API || "http://localhost:8000",
    GOOGLE_API_KEY:
      process.env.VUE_APP_GOOGLE_API_KEY ||
      "AIzaSyC_KLUY2Jr4QcPR4gbBkbCzv3DGP3rb9DM",
    BASE_URL: process.env.BASE_URL || "/"
  },
  production: {
    BASE_API:
      process.env.VUE_APP_BASE_API ||
      "https://www.bacancy.com/ExtraSliceBackend",
    GOOGLE_API_KEY:
      process.env.VUE_APP_GOOGLE_API_KEY ||
      "AIzaSyC_KLUY2Jr4QcPR4gbBkbCzv3DGP3rb9DM",
    BASE_URL: process.env.BASE_URL || "/ExtraSlice/"
  },
  test: {
    BASE_API: process.env.VUE_APP_BASE_API || "http://127.0.0.1:8000",
    GOOGLE_API_KEY: process.env.VUE_APP_GOOGLE_API_KEY,
    BASE_URL: process.env.BASE_URL || "/"
  }
};

exports.get = function get(env) {
  return config[env] || config[process.env.NODE_ENV || "development"];
};
