import Vue from "vue";
import test from "./test";
import Foo1 from "./Foo1";
import Router from "vue-router";
const Bar = { template: "<div>bar</div>" };
const Foo = { template: "<div>foo</div>" };
import ClientDashBoard from "./views/client/Dashboard";
import ListProperties from "./views/client/ListProperties";

import { getToken } from "./utils/auth"; // get token from cookie
import store from "./store";
Vue.use(Router);

export function createRouter() {
  const router = new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "dashBoard",
        component: ClientDashBoard,
        children: [
          {
            path: "/list",
            name: "List",
            component: ListProperties,
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: "/test/:userId",
        name: "user",
        component: Foo
      },
      {
        path: "/test1/:userId",
        name: "Foo1",
        component: Foo1
      }
    ]
  });

  router.beforeEach(async (to, from, next) => {
    console.info("before route ::", to.path);
    // determine whether the user has logged in
    const hasToken = await getToken();
    if (to.path === "/login") {
      next({ path: "/" });
    } else if (
      to.matched.some(record => record.meta.requiresAuth) &&
      !hasToken
    ) {
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

  return router;
}
