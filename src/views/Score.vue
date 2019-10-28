<template>
  <div class="about">
    <h1>{{ userScore }}</h1>
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
        this.userScore = this.$props.score;
    }
}
</script>