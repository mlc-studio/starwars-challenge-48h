<script setup>
</script>

<template>
    <main class="home">    
        <section class="home__banner">
            <div class="home__banner__top">
                <ul>
                    <li><router-link to="/home"><p>Home</p></router-link></li>
                    <li><router-link to="/quiz"><p>Quiz</p></router-link></li>
                    <li><router-link to="/wiki"><p>Wiki</p></router-link></li>
                </ul>
            </div>
            <div class="home__logo">
                <img scr="/img/starwars_logo.png" alt="Logo Star Wars">
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
                <img src="/img/trooper.png" alt="Image Wiki">
            </div>
            <div class="home__wiki__content">
                <p>Content for wiki</p>
            </div>
        </section>
    </main>
</template>