<template>
 <wrapper v-bind:current-state="currentState" />
</template>

<script>
import Wrapper from "./components/Wrapper.vue"

export default {
  name: "App",
  components: {
    Wrapper
  },
  methods: {
    joinRoom: function () {
      alert('in room')
      this.state = "inputName"
    }
  },
  date: function () {
    return {
      currentState:"init"
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
