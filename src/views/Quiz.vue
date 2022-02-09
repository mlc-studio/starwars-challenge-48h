<script setup>
import { ref, onMounted } from "vue";

import API from "../utils/api";

import Header from "../components/Header.vue";

const categories = ref([
  {
    slug: "species",
  },
  {
    slug: "films",
  },
  {
    slug: "vehicles",
  },
  {
    slug: "people",
  },
  {
    slug: "starships",
  },
  {
    slug: "planets",
  },
]);
const gameController = ref({
  playerScore: 0,
  playerAnswers: [],
  playerCurrentAnswer: undefined,

  isGameReady: false,
  isGameStart: false,
  isGameFinish: false,
  isValidate: false,
  step: 0,

  badPopup: "",
  rightPopup: "",

  questions: [],
  questionCount: 10,
});

onMounted(() => {
  generateQuestions();
});

const generateQuestions = async () => {
  for (let i = 0; i < gameController.value.questionCount; i++) {
    let category =
      categories.value[Math.floor(Math.random() * categories.value.length)]
        .slug;
    let res = await API.getItemsFromCategory(category);
    let pageCount = Math.ceil(res.count / 10);

    res = await API.getItemsFromCategory(
      category,
      randomIntFromInterval(1, pageCount)
    );

    let currentObject =
      res.results[Math.floor(Math.random() * res.results.length)];

    let fields = [];

    switch (category) {
      case "species":
        fields = ["classification", "average_height"];
        break;
      case "films":
        fields = ["episode_id", "director"];
        break;
      case "planets":
        fields = ["climate", "gravity"];
        break;
      case "starships":
        fields = ["cargo_capacity", "consumables", "model"];
        break;
      case "people":
        fields = ["eye_color", "height", "gender"];
        break;
      case "vehicles":
        fields = ["length", "cargo_capacity", "vehicle_class"];
        break;
    }

    let field = fields[Math.floor(Math.random() * fields.length)];

    let question = {
      title: `What is the "${field.replace("_", " ")}" of the ${
        category.slice(-1) == "s"
          ? category.substring(0, category.length - 1)
          : category
      } with the ${
        currentObject.name ? "name" : currentObject.title ? "title" : "name"
      } "${currentObject.name || currentObject.title} ?"`,
      answers: [currentObject[field]],
      rightAnswer: currentObject[field],
    };

    for (let i = 0; i < 3; i++) {
      res = await API.getItemsFromCategory(
        category,
        randomIntFromInterval(1, pageCount)
      );
      let badObject =
        res.results[Math.floor(Math.random() * res.results.length)];
      question.answers.push(badObject[field]);
    }

    question.answers = question.answers.sort((a, b) => 0.5 - Math.random());
    question.answers = [...new Set(question.answers)];

    gameController.value.questions.push(question);
  }
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const onGameStart = () => {
  gameController.value.isGameStart = true;
};

const onChooseAnswer = (answer) => {
  if (gameController.value.isValidate) return;
  gameController.value.playerCurrentAnswer = answer;
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
      gameController.value.questions[gameController.value.step].rightAnswer
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
      gameController.value.questions[gameController.value.step].rightAnswer
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

const onReload = () => {
  location.reload();
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
      :class="{
        'quiz__content--centered':
          !gameController.isGameStart || gameController.isGameFinish,
      }"
    >
      <template v-if="!gameController.isGameStart">
        <h4 class="quiz__title heading--h1 heading--stroke heading--white">
          “Remember…the Force will be with you, always.”
        </h4>
        <template
          v-if="gameController.questions.length < gameController.questionCount"
        >
          <div class="quiz__loading container">
            <div class="quiz__loading-bar">
              <div
                :style="`width: ${
                  (gameController.questions.length /
                    gameController.questionCount) *
                  100
                }%`"
                class="quiz__loading-indicator"
              ></div>
            </div>
            <h2 class="heading--h3 quiz__loading-title">Questions are being generated</h2>
            <div class="quiz__loading-circle">
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
          </div>
        </template>
        <button v-else @click.prevent="onGameStart" class="btn">
          Start Now
        </button>
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
              @click.prevent="onChooseAnswer(answer)"
              v-for="(answer, index) in gameController.questions[
                gameController.step
              ].answers"
              :key="index"
              class="quiz__game-answer"
              :class="{ active: gameController.playerCurrentAnswer == answer }"
            >
              <label :for="`answer-${index}`">{{ answer }}</label>
              <input type="radio" :id="`answer-${index}`" name="game-answer" />
            </div>
          </div>
          <div class="quiz__popup" :class="{ 'red': gameController.badPopup, 'green': gameController.rightPopup}" v-if="gameController.badPopup || gameController.rightPopup">
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
              v-if="gameController.step + 1 == gameController.questionCount"
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
            “When gone am I, the last of the Jedi will you be. The Force runs strong in your family. Pass on what you have learned.” — Yoda
          </p>
          <h2 class="quiz__score-title heading--stroke">
            {{ gameController.playerScore }} /
            {{ gameController.questionCount }}
          </h2>
          <div class="quiz__score-buttons">
            <router-link @click.prevent="onReload" class="btn" to="/quiz"
              >Try Again</router-link
            >
            <router-link class="btn btn--outline" to="/"
              >Go back Home</router-link
            >
          </div>
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
