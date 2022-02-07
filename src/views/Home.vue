<script setup>
import { ref } from 'vue';

import Bouton from "../components/Bouton.vue"

const exemple = ref('texy');
let listeTest = ['mon', 'pre'];

console.log(exemple.value)

</script>

<template>
    <div>
        <h1>Home</h1>
        <p>{{ exemple }}</p>
        <div>
            <p v-for="mot, index in listeTest">{{ mot }}:{{ index }}</p>
        </div>
        <Bouton :text="exemple" />
    </div>
</template>