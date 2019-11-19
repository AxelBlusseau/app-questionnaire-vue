<template>
  <div class="home">
    <DisplaySurvey :listQuestions="questions" /> <!-- Je feed mon composant avec les questions que j'ai générées -->
  </div>
</template>

<script>

import DisplaySurvey from "@/components/ABDisplaySurvey.vue"; //J'importe le composant qui gère l'afficheage des questions
import QuestionJson from "../../json/questions.json"; //J'importe le fichier json où sont stockées mes questions

export default {
  data() {
    return {
      questions: [],
      show: true
    };
  },
  created: function() {
    //Lancer des methodes au moment ou la page se charge (le plus souvent ce sont des appels api)
    this.ABgetQuestions();
  },
  methods: {
    //Génération aléatoire des questions
    ABshuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    //On prend les questions est ont les tries aléatoirement pour les renvoyer au composant
    ABgetQuestions: function() {
      var count = Object.keys(QuestionJson["questions"]).length;
      this.ABshuffleArray(QuestionJson["questions"])
      for (var k in QuestionJson["questions"]){
        this.questions.push(QuestionJson["questions"][k]);
      }
    }
  },

  name: "questionnaire",
  components: {
    DisplaySurvey
  }
};
</script>
