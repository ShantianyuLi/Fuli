<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="hello">
      <h1>欢迎来到fuli</h1>
      <h2 v-if="roomId">房间号： {{ roomId }}</h2>
      <h2 v-if="userName">昵称：{{ userName }}</h2>
    </div>
    <!-- init -->
    <div v-if="currentState === 'init'">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <button type="button" v-on:click="createRoom" class="btn btn-dark">创建房间</button>
          </div>
          <div class="col-sm">
            <button type="button" v-on:click="currentState = 'inputName'" class="btn btn-dark">加入房间</button>
            <input type="text" v-model="roomId" class="input-group-text" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentState === 'inputName'">
      <div>
        <p>请输入昵称</p>
        <input type="text" v-model="userName" />
        <button type="button" v-on:click="currentState = 'waiting'" class="btn btn-dark">确认</button>
      </div>
    </div>

    <div v-if="currentState === 'waiting'">
      <div>
        <p v-if="waiting">请等待其他玩家</p>
        <p v-else-if="!waiting">请准备</p>
        <button
          type="button"
          :class="{active: !waiting}"
          v-on:click="readyGame"
          class="btn btn-dark"
          :disabled="waiting"
        >确认</button>
      </div>
      <h2>已加入成员：{{nameList.length}}</h2>
      <li v-for="name in nameList" :key="name">{{name}}</li>
      <button v-if="isCreator" type="button" class="btn btn-dark">开始游戏！</button>
    </div>
  </div>
</template>

<script>


export default {
  name: "Wrapper",
  data: function() {
    return {
      currentState: "init",
      roomId: null,
      userName: null,
      waiting: false,
      nameList: ["aaa", "bbb"],
      isCreator: false,
    };
  },
  components: {},
  methods: {
    createRoom: function() {
      this.currentState = "inputName";
      this.roomId = Math.round(Math.random() * 100000)
      this.isCreator = true
    },
    readyGame: function() {
      this.waiting = true;
      this.nameList.push(this.userName)
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
