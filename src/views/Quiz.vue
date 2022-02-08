<script setup>
import { ref } from "vue";

import Header from "../components/Header.vue";

const gameController = ref({
  playerScore: 0,
  playerAnswer: [],
  isGameStart: false,
  step: 0,
  questionCount: 10,
});

const onGameStart = () => {
  gameController.value.isGameStart = true;
};
</script>

<template>
  <Header />
  <main class="quiz">
    <div class="quiz__progress container">
      <div
        class="quiz__progress-item"
        v-for="count in gameController.questionCount"
        :key="count"
      >
        <svg
          v-if="gameController.playerAnswer[count - 1] === 1"
          class="quiz__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          v-if="gameController.playerAnswer[count - 1] === 0"
          class="quiz__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
    <div class="quiz__content container" :class="{ 'quiz__content--centered': !gameController.isGameStart }">
      <template v-if="!gameController.isGameStart">
        <h4 class="quiz__title heading--h1 heading--stroke heading--white">
          “Remember…the Force will be with you, always.”
        </h4>
        <button @click.prevent="onGameStart" class="btn">Start Now</button>
      </template>
      <template v-if="gameController.isGameStart">
          <div class="quiz__game">
              <div class="quiz__game-head">

            <h3 class="heading--h1 heading--stroke">
                Question number: {{ gameController.step + 1 }}
            </h3>
            <h2 class="quiz__game-question heading--h3">
                Intitulé de la question
            </h2>
              </div>
            <div class="quiz__game-separator"></div>
            <div class="quiz__game-answers">
                <div class="quiz__game-answer">
                    <label for="answer-1">Intitulé de la answer</label>
                    <input type="radio" id="answer-1" name="game-answer" />
                </div>
                <div class="quiz__game-answer">
                    <label for="answer-2">Intitulé de la answer</label>
                    <input type="radio" id="answer-2" name="game-answer" />
                </div>
                <div class="quiz__game-answer">
                    <label for="answer-3">Intitulé de la answer</label>
                    <input type="radio" id="answer-3" name="game-answer" />
                </div>
                <div class="quiz__game-answer">
                    <label for="answer-4">Intitulé de la answer</label>
                    <input type="radio" id="answer-4" name="game-answer" />
                </div>
            </div>
            <button class="btn">
                Next Question
            </button>
          </div>
      </template>
    </div>
    <div class="quiz__footer container">
      <router-link class="quiz__footer-link" to="/"
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
          />
        </svg>
        Go back Home</router-link
      >
    </div>
  </main>
</template>
