import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Categories from '../views/Categories.vue';
import Category from '../views/Category.vue';

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;