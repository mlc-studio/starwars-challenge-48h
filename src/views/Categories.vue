<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

import { inject } from 'vue';
const { state, setStateProp } = inject('state');

const router = useRouter();

const categories = ref([
    {
        name: 'Species',
        link: 'species',
        img: 'species.jpg'
    },
    {
        name: 'Film',
        link: 'films',
        img: 'films.jpg'
    },
    {
        name: 'Vehicle',
        link: 'vehicles',
        img: 'vehicles.png'
    },
    {
        name: 'People',
        link: 'people',
        img: 'people.jpg'
    },
    {
        name: 'Starship',
        link: 'starships',
        img: 'starships.jpg'
    },
    {
        name: 'Planet',
        link: 'planets',
        img: 'planets.jpg'
    }
]);

const onRedirectCategory = (category) => {
    setStateProp('currentCategory', { category });
    router.push(`/category/${category.link}`);
}

</script>

<template>
<main class="categories">
    <section class="categories__navbar">
        <h1>
            Choisir une categorie
        </h1>
    </section>
    <section class="categories__body">
        <a :title="category.name" class="categories__item" @click.prevent="onRedirectCategory(category)" :to="`/category/${category.link}`" v-for="category, index in categories" :key="index">
            <img :src="`/img/${category.img}`" :alt="category.name">
        </a>
    </section>
</main>
</template>