import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Categories from '../views/Categories.vue';
import Category from '../views/Category.vue';
import Details from '../views/Details.vue';
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
        path: '/categories',
        name: 'Categories',
        component: Categories
    },
    {
        path: '/category/:category',
        name: 'Category',
        component: Category
    },
    {
        path: '/category/:category/:id',
        name: 'Details',
        component: Details,
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
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'catchAll',
        component: Home
     }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;