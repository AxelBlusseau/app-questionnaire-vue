<template>
  <div class="home">
    <DisplaySurvey :listQuestions="oui" />
  </div>
</template>

<script>
// @ is an alias to /src

import DisplaySurvey from "@/components/DisplaySurvey.vue";
import QuestionJson from "../../json/questions.json";

export default {
  data() {
    return {
      oui: [],
      show: true
    };
  },
  created: function() {
    //Lancer des methodes au moment ou la page se charge (le plus souvent ce sont des apl api)
    this.getQuestions();
  },
  methods: {
    //Génération aléatoire des questions
    getQuestions: function() {
      var count = Object.keys(QuestionJson["questions"]).length;
      console.log(count);
      //var item = QuestionJson["questions"][Math.floor(Math.random()*QuestionJson["questions"].length)];
      //console.log(item)
      for (var k in QuestionJson["questions"]) {
        this.oui.push(QuestionJson["questions"][k]);
      }
    }
  },

  name: "survey",
  components: {
    DisplaySurvey
  }
};
</script>
