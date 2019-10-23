<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <FormProfil />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import FormProfil from '@/components/FormProfil.vue'

export default {
  name: 'home',
  components: {
    FormProfil
  }
}
</script>
