import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Quiz from '../views/Quiz.vue';
import Result from '../views/Result.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/quiz',
        name: 'Quiz',
        component: Quiz,
    },
    {
        path: '/result',
        name: 'Result',
        component: Result,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;