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
                <img src="/img/fond-ecran_home.png" alt="Backgound Image">
            </div>
        </section>
        <section class="home__quiz">
            <div class="home__quiz__content">
                <p>Texte Descriptif</p>
            </div>
            <div class="home__quiz__image">
                <img src="/img/dark_vador.png" alt="Image for the Quiz">
            </div>
        </section>
        <section class="home__wiki">
            <div class="home__wiki__image">
                <img src="/img/trooper.png" alt="Image à propos">
            </div>
            <div class="home__wiki__content">
                <p>Content for wiki</p>
            </div>
        </section>
    </main>
</template>