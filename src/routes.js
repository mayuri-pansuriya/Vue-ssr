import Vue from "vue";
import test from "./test";
import Foo1 from "./Foo1";
import Router from "vue-router";
const Bar = { template: "<div>bar</div>" };
const Foo = { template: "<div>foo</div>" };
import ClientDashBoard from "./views/client/Dashboard";
Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "dashBoard",
        component: ClientDashBoard
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
}
