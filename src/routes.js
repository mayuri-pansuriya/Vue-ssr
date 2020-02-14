import Vue from "vue";
import test from "./test";
import Foo1 from "./Foo1";
import Router from "vue-router";
const Bar = { template: "<div>bar</div>" };
const Foo = { template: "<div>foo</div>" };

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "Hello",
        component: test
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
