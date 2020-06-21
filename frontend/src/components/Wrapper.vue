<template>
  <div id = "wrapper">
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
        <button type="button" v-on:click="readyGame" class="btn btn-dark" :disabled="waiting">确认</button>
      </div>
      <h2>已加入成员：{{users.length}}</h2>
      <li v-for="name in users" :key="name">{{name}}</li>
      <button v-if="isCreator" type="button" class="btn btn-dark" v-on:click="startGame">开始游戏！</button>
    </div>

    <div v-if="currentState === 'question'">
      <p>{{question}}</p>
      <input type="text" v-model="answer" />
      <button type="button" v-on:click="submitAnswer" class="btn btn-dark" :disabled="submitted">确认</button>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
import io from "socket.io-client";
import Store from "./Store";
const socket = io("http://localhost:3000/");

const Wrapper = {
  store: Store,
  data: function() {
    return {
      currentState: this.$store.state.currentState,
      roomId: this.$store.state.roomId,
      userName: this.$store.state.userName,
      waiting: this.$store.state.waiting,
      isCreator: this.$store.state.isCreator,
      question: this.$store.state.question,
      answer: this.$store.state.answer,
      submitted: this.$store.state.submitted
    }
   },
  methods: {
    createRoom: function() {
      this.currentState = "inputName";
      this.roomId = Math.round(Math.random() * 100000);
      this.isCreator = true;
      socket.emit("create-room", { roomId: this.roomId });
    },
    readyGame: function() {
      this.waiting = true;
      socket.emit("add-room", { roomId: this.roomId, userName: this.userName });
    },
    startGame: function() {
      socket.emit("start-game", { roomId: this.roomId });
    },
    submitAnswer: function() {
      this.submitted = true;
      socket.emit("submit-answer", {
        roodId: this.roomId,
        userName: this.userName,
        answer: this.answer
      });
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    }
  }
};

socket.on("read-data", function(data) {
  Wrapper.nextState = data.nextState;
});

socket.on("after-add-room", function(data) {
  const { isSuccess, users } = data;
  if (isSuccess) {
    console.log(Wrapper)
    Wrapper.store.users = users;
  } else {
    alert("roomId is invailed: " + Wrapper.roomId);
  }
});

socket.on("after-start-game", function(data) {
  const { roomId, question, state } = data;
  if (roomId != Wrapper.roodId) return;
  Wrapper.question = question;
  Wrapper.submitted = false;
  Wrapper.currentState = state;
});

export default Wrapper;
</script>

<style>
</style>
