<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { inject } from "vue";
const { state, setStateProp } = inject("state");

const router = useRouter();

const categories = ref([
  {
    name: "Species",
    link: "species",
    img: "species.jpg",
  },
  {
    name: "Film",
    link: "films",
    img: "films.jpg",
  },
  {
    name: "Vehicle",
    link: "vehicles",
    img: "vehicles.png",
  },
  {
    name: "People",
    link: "people",
    img: "people.jpg",
  },
  {
    name: "Starship",
    link: "starships",
    img: "starships.jpg",
  },
  {
    name: "Planet",
    link: "planets",
    img: "planets.jpg",
  },
]);

const onRedirectCategory = (category) => {
  setStateProp("currentCategory", { category });
  router.push(`/category/${category.link}`);
};
</script>

<template>
  <main class="categories">
    <div class="categories__navigation container">
      <div class="categories__menu"></div>
      <router-link to="/" class="categories__home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </router-link>
    </div>
    <div class="categories__title container">
        <h3 class="heading--h1 heading--stroke">
            List of categories
        </h3>
    </div>
    <div class="categories__body container">
      <a
        href="#"
        :title="category.name"
        class="categories__item"
        @click.prevent="onRedirectCategory(category)"
        :to="`/category/${category.link}`"
        v-for="(category, index) in categories"
        :key="index"
      >
        <img :src="`/img/${category.img}`" :alt="category.name" />
      </a>
    </div>
  </main>
</template>
