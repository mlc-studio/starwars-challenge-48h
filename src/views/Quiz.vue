<script setup>
import { ref, onMounted } from "vue";

import Header from "../components/Header.vue";

const gameController = ref({
  playerScore: 0,
  playerAnswers: [],
  playerCurrentAnswer: undefined,

  isGameStart: false,
  isGameFinish: false,
  isValidate: false,
  step: 0,

  badPopup: "",
  rightPopup: "",

  questions: [
    {
      title: "Titre de la question ?",
      answers: [
        "this one is wrong",
        "this one is wrong to",
        "this one is right",
        "Wrong bro!",
      ],
      rightAnswer: 2,
    },
    {
      title: "Titre de la question 2 ?",
      answers: [
        "this one is wrong",
        "this one is wrong to",
        "this one is right",
        "Wrong bro!",
      ],
      rightAnswer: 2,
    },
    {
      title: "Titre de la question 3 ?",
      answers: [
        "this one is wrong",
        "this one is wrong to",
        "this one is right",
        "Wrong bro!",
      ],
      rightAnswer: 2,
    },
    {
      title: "Titre de la question 4 ?",
      answers: [
        "this one is wrong",
        "this one is wrong to",
        "this one is right",
        "Wrong bro!",
      ],
      rightAnswer: 2,
    },
  ],
  questionCount: 4,
});

onMounted(() => {
  generateQuestions();
})

const generateQuestions = () => {

}

const onGameStart = () => {
  gameController.value.isGameStart = true;
};

const onChooseAnswer = (index) => {
  if (gameController.value.isValidate) return;
  gameController.value.playerCurrentAnswer = index;
};

const onValidate = () => {
  if (gameController.value.playerCurrentAnswer == undefined) return;

  gameController.value.isValidate = true;

  if (
    gameController.value.playerCurrentAnswer !=
    gameController.value.questions[gameController.value.step].rightAnswer
  ) {
    gameController.value.playerAnswers.push(0);

    gameController.value.rightPopup = "";
    gameController.value.badPopup = `Bad answer, the correct one was: ${
      gameController.value.questions[gameController.value.step].answers[
        gameController.value.questions[gameController.value.step].rightAnswer
      ]
    }`;
  }

  if (
    gameController.value.playerCurrentAnswer ==
    gameController.value.questions[gameController.value.step].rightAnswer
  ) {
    gameController.value.playerAnswers.push(1);
    gameController.value.playerScore++;

    gameController.value.badPopup = "";
    gameController.value.rightPopup = `You right ! The correct answer was: ${
      gameController.value.questions[gameController.value.step].answers[
        gameController.value.questions[gameController.value.step].rightAnswer
      ]
    }`;
  }
};

const onNextQuestion = () => {
  // Reset
  gameController.value.isValidate = false;
  gameController.value.rightPopup = "";
  gameController.value.badPopup = "";
  gameController.value.playerCurrentAnswer = undefined;

  // Check if Finish
  if (gameController.value.step + 1 == gameController.value.questionCount) {
    gameController.value.isGameFinish = true;
  }

  // Next
  gameController.value.step++;
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
          v-if="gameController.playerAnswers[count - 1] === 1"
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
          v-if="gameController.playerAnswers[count - 1] === 0"
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
    <div class="quiz__heading container" v-if="gameController.isGameFinish">
      <h2 class="heading--h2 heading--stroke uppercase">Score</h2>
    </div>
    <div
      class="quiz__content container"
      :class="{ 'quiz__content--centered': !gameController.isGameStart || gameController.isGameFinish }"
    >
      <template v-if="!gameController.isGameStart">
        <h4 class="quiz__title heading--h1 heading--stroke heading--white">
          “Remember…the Force will be with you, always.”
        </h4>
        <button @click.prevent="onGameStart" class="btn">Start Now</button>
      </template>
      <template
        v-if="gameController.isGameStart && !gameController.isGameFinish"
      >
        <div class="quiz__game">
          <div class="quiz__game-head">
            <h3 class="heading--h1 heading--stroke">
              Question number: {{ gameController.step + 1 }}
            </h3>
            <h2 class="quiz__game-question heading--h3">
              {{ gameController.questions[gameController.step].title }}
            </h2>
          </div>
          <div class="quiz__game-separator"></div>
          <div class="quiz__game-answers">
            <div
              @click.prevent="onChooseAnswer(index)"
              v-for="(answer, index) in gameController.questions[
                gameController.step
              ].answers"
              :key="index"
              class="quiz__game-answer"
              :class="{ active: gameController.playerCurrentAnswer == index }"
            >
              <label :for="`answer-${index}`">{{ answer }}</label>
              <input type="radio" :id="`answer-${index}`" name="game-answer" />
            </div>
          </div>
          <div v-if="gameController.badPopup || gameController.rightPopup">
            <p>
              {{ gameController.badPopup || gameController.rightPopup }}
            </p>
          </div>
          <button
            v-if="!gameController.isValidate"
            @click.prevent="onValidate"
            class="btn"
          >
            Validate
          </button>
          <button
            v-if="gameController.isValidate"
            @click.prevent="onNextQuestion"
            class="btn"
          >
            <template
              v-if="
                gameController.step + 1 ==
                gameController.questionCount
              "
            >
              Show Results
            </template>
            <template v-else> Next Question </template>
          </button>
        </div>
      </template>
      <template v-if="gameController.isGameFinish">
        <div class="quiz__score-container">
          <p class="quiz__score-citation">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita voluptates omnis, aliquam distinctio odit excepturi labore nobis voluptate praesentium rerum laborum sapiente dolorum iusto fugit debitis alias ipsam incidunt sed?
          </p>
          <h2 class="quiz__score-title heading--stroke">
          {{ gameController.playerScore }} / {{ gameController.questionCount }}
          </h2>
          <router-link class="btn btn--outline" to="/">Go back Home</router-link>
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
