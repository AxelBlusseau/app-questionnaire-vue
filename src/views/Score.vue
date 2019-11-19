<template>
  <div class="about" style="margin-top:10%">
    <div v-if="userScore >= 0">
      <h3>Score :</h3>
      <span style="font-size:100px">{{ userScore }}</span>pts 
    </div>   
    <div v-else>
      <h3>Vous n'avez pas encore répondu au quizz !</h3>
    </div>  
    <b-button href="/" class="primary">Revenir à la page d'accueil</b-button>
  </div>
</template>
<script>
export default {
    name: "score",
    props: ["score"],
    data: function(){
        return {
            userScore: null
        }
    },
    created(){
        //Lancer des methodes au moment ou la page se charge (le plus souvent ce sont des appels api)
        this.userScore = this.$props.score;
    }
}
</script>