import { createRouter } from "./routes.js";
import { getToken } from "./utils/auth"; // get token from cookie
import store from "./store";

createRouter.beforeEach(async (to, from, next) => {
  console.info("before route ::", to.path);
  // determine whether the user has logged in
  const hasToken = await getToken();
  if (to.path === "/login") {
    next({ path: "/" });
  } else if (to.matched.some(record => record.meta.requiresAuth) && !hasToken) {
    console.info("route has auth but token not found");
    next({ path: "/" });
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    console.info("route has auth", to.path);
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
    } else {
      const hasGetUserInfo = await store.getters.name;
      if (hasGetUserInfo) {
        const hasUserRole = await store.getters.role;
        if (to.matched.some(record => record.meta.adminAuth)) {
          if (hasUserRole && hasUserRole === "admin") {
            next();
          } else {
            next({ path: "/" });
          }
        } else {
          next();
        }
      } else {
        try {
          console.info("authenticate token");
          // get user info
          await store.dispatch("user/getInfo");
          if (to.matched.some(record => record.meta.adminAuth)) {
            const hasUserRole = await store.getters.role;
            if (hasUserRole && hasUserRole === "admin") {
              next();
            } else {
              next({ path: "/" });
            }
          } else {
            next();
          }
          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          next(`/`);
        }
      }
    }
  } else if (hasToken && to.path == "/") {
    try {
      console.info("has token");
      // get user info
      await store.dispatch("user/getInfo");
      if (to.matched.some(record => record.meta.adminAuth)) {
        const hasUserRole = await store.getters.role;
        if (hasUserRole && hasUserRole === "admin") {
          next();
        } else {
          next({ path: "/" });
        }
      } else {
        next();
      }
    } catch (error) {
      // remove token and go to login page to re-login
      await store.dispatch("user/resetToken");
      next(`/`);
    }
  } else {
    console.info("next ::", to.path);
    next();
  }
});
