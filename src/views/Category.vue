<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import API from "../utils/api";

const route = useRoute();
const router = useRouter();

const categoryName = ref("");
const currentPage = ref(1);
const resultAPI = ref({});

onMounted(() => {
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
  resultAPI.value = await API.getItemsFromCategory(
    categoryName.value,
    currentPage.value
  );
};

const onGoBack = () => {
    router.go(-1);
}

</script>

<template>
  <div>
    <div>
        <a @click.prevent="onGoBack" href="#">
            Go back
        </a>
      <h1>Category name: {{ categoryName }}</h1>
    </div>
    <div>
      <p v-for="(item, index) of resultAPI.results" :key="index">
        {{ item.name || item.title }}
      </p>
    </div>
    <div>
      <button v-if="resultAPI.previous" @click="onPreviousPage">
        Previous
      </button>
      <span> Page numéro: {{ currentPage }} </span>
      <button v-if="resultAPI.next" @click="onNextPage">Next Page</button>
    </div>
  </div>
</template>
