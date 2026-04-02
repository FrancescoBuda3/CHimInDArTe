import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import HomeView from "../views/HomeView.vue";
import ExploreView from "../views/ExploreView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import QuizView from "../views/QuizView.vue";
import WorkDetailsView from "../views/WorkDetailsView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView
    /* props: (route) => ({
      notebookId: route.query.notebookId as string | undefined
    }), */
  },
  {
    path: "/explore",
    name: "Explore",
    component: ExploreView,
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: QuizView,
  },
  {
    path: "/works/:id",
    name: "WorkDetails",
    component: WorkDetailsView,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFoundView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
