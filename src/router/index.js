import { createWebHistory, createRouter } from "vue-router";
import quiz from "@/components/QuizPage.vue";
import smpl from "@/components/sampleproject.vue";

const routes = [
    {
        path: "/quiz",
        name: "quiz",
        component: quiz

        
    },
    {
        path: "/sample",
        name: "smpl",
        component: smpl
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

