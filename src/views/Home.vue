<script setup>
import { ref } from 'vue';

import Bouton from "../components/Bouton.vue"

const exemple = ref('texy');
let listeTest = ['mon', 'pre'];

console.log(exemple.value)

</script>

<template>
    <main class="home">
        <section class="home__banner">
            <div class="home__logo">

            </div>
            <div class="home__background">

            </div>
        </section>
        <section class="home__quiz">
            <div class="home__quiz__content">

            </div>
            <div class="home__quiz__image">
                <img src="" alt="">
            </div>
        </section>
        <section class="home__wiki">
            <div class="home__wiki__image">

            </div>
            <div class="home__wiki__content">

            </div>
        </section>
    </main>
    
</template>