<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";

import API from "../utils/api";

const { state, setStateProp } = inject("state");

const route = useRoute();
const router = useRouter();

const categoryName = ref("");
const currentPage = ref(1);
const resultAPI = ref({});

onMounted(() => {
  setStateProp("loading", true);

  categoryName.value = route.params.category;
  onChangePage();
});

const onNextPage = () => {
  currentPage.value++;
  onChangePage();
};

const onPreviousPage = () => {
  currentPage.value--;
  onChangePage();
};

const onChangePage = async () => {
  setStateProp("loading", true);
  resultAPI.value = await API.getItemsFromCategory(
    categoryName.value,
    currentPage.value
  );

  setStateProp("loading", false);
};

const getOnlyId = (string) => {
    let arrayString = string.split('/');
    return arrayString[arrayString.length - 2];
}

const onGoBack = () => {
  router.go(-1);
};
</script>

<template>
  <main class="category">
    <div class="category__navigation container">
      <div class="category__menu">
        <router-link to="/categories" class="category__link"
          ><svg
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
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            /></svg
          >Go back</router-link
        >
      </div>
      <router-link to="/" class="category__home">
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
    <div class="category__title container">
      <h3 class="heading--h1 heading--stroke">
        List of all {{ categoryName }}...
      </h3>
    </div>
    <div v-if="!state.loading" class="category__body container">
      <router-link
        class="category__item"
        :to="`/category/${categoryName}/${getOnlyId(item.url)}`"
        v-for="(item, index) of resultAPI.results"
        :key="index"
      >
        {{ item.name || item.title }} | {{ item.birth_year }}
      </router-link>
    </div>
    <div v-else class="category__loading">
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
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </div>
    <div v-if="!state.loading" class="category__pagination container">
      <span
        class="btn btn--outline"
        v-if="resultAPI.previous"
        @click="onPreviousPage"
      >
        Previous
      </span>
      <span> {{ currentPage }} </span>
      <span class="btn btn--outline" v-if="resultAPI.next" @click="onNextPage"
        >Next</span
      >
    </div>
  </main>
</template>
