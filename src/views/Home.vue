<script setup>

import Header from '../components/Header.vue';

</script>

<template>
    <Header />
    <main class="home">    
        <section class="home__banner">
            <div class="home__logo">
                <img src="/img/starwars_logo.png" alt="Logo Star Wars">
            </div>
            <div class="home__background">
                <img src="/img/fond-ecran_home.png" alt="Backgound Image">
            </div>
        </section>
        <section class="home__quiz container">
            <div class="home__quiz__content">
                <h3 class="heading--h1 heading--stroke">
                    The Quiz
                </h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe iure vitae officia animi cumque? Impedit ullam quod dignissimos cumque molestias. Quos, vitae. Asperiores, nulla hic fugiat neque non recusandae minus?</p>
                <router-link class="btn" to="/quiz">
                    Make the Quiz
                </router-link>
            </div>
            <div class="home__quiz__image">
                <img src="/img/dark_vador.png" alt="Image for the Quiz">
            </div>
        </section>
        <section class="home__wiki container">
            <div class="home__wiki__image">
                <img src="/img/trooper.png" alt="Image Wiki">
            </div>
            <div class="home__wiki__content">
                <h3 class="heading--h1 heading--stroke">
                    The Wiki
                </h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe iure vitae officia animi cumque? Impedit ullam quod dignissimos cumque molestias. Quos, vitae. Asperiores, nulla hic fugiat neque non recusandae minus?</p>
                <router-link class="btn" to="/categories">
                    Look the Wiki
                </router-link>
            </div>
        </section>
        <section class="home__footer container">

        </section>
    </main>
</template>