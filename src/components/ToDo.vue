<template>
  <div class="container">

    <div class="lists-container">
      <div class="todo-list">
        <h3 class="text-center text-black">TODO</h3>
        <div class="item" :class="{'show': item.show}" v-for="(item, index) in todoList" :key="index">
          <div class="item-title">
            {{ item.title }}
          </div>
          <div class="item-manage">
            <i class="fas fa-trash" @click="deleteItem(item)"></i>
            <i v-if="!item.complete" class="fas fa-square" @click="completeItem(item)"></i>
          </div>
        </div>
      </div>

      <div class="todo-list complete-list">
        <div class="show-completed" v-if="completedToDoList.length > 0">
          <h3 class="text-black">DONE</h3>
        </div>
        <div class="item show" v-for="(item, index) in completedToDoList" :key="index">
          <div class="item-title">
            {{ item.title }}
          </div>
          <div class="item-manage">
            <i v-if="item.complete" class="fas fa-check-square" @click="uncompleteItem(item)"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-show='showAddNewModal' class="add-item">
      <form @submit.prevent="addItem">
        <input type="text" placeholder="Add..." v-model="entry">
      </form>
      <div class="add-icon" @click="addItem">
        <i class="fas fa-plus"></i>
      </div>
    </div>

    <div class="floating-buttons">
      <div class="floating-button clear-data" @click="clearData">
        <i class="fas fa-trash"></i>
      </div>
      <div class="floating-button add-new-open" @click='showAddNewModal = !showAddNewModal'>
        <i v-if="showAddNewModal" class="fas fa-minus"></i>
        <i v-else class="fas fa-plus"></i>
      </div>
    </div>
  </div>

</template>

<script>
export default {

  // Debug function that runs on build
  created(){
    // var exArray = [{id: '123', title: '123', complete: false}];
    // console.log(exArray);
    // console.log(localStorage.getItem("todolist"));
  },

  data: () => {
    return {
      showAddNewModal: false,
      entry: '',
      // get todolist from storage
      todoList: localStorage.getItem("todolist") ? JSON.parse(localStorage.getItem("todolist")) : [],
      // get completedtodolist from storage
      completedToDoList: localStorage.getItem("completedtodolist") ? JSON.parse(localStorage.getItem("completedtodolist")) : [],
    }
  },

  methods: {

    // Add new item
    addItem() {
      if(this.entry !== '') {
        let date = new Date;

        this.todoList.push({
          id: date.getTime(),
          title: this.entry,
          complete: false
        });

        localStorage.setItem("todolist", JSON.stringify(this.todoList));
      }
      this.entry = '';
    },

    // Clear Local Storage
    clearData(){
      this.todoList = [];
      this.completedToDoList = [];
      localStorage.clear();
    },

    // Set an item complete
    completeItem(item) {
        item.complete = !item.complete;
        this.completedToDoList.push(item);
        let index = this.todoList.findIndex(element => element.id === item.id);
        this.todoList.splice(index, 1);
        this.setStorage(this.todoList, this.completedToDoList);
    },

    // Delete an item
    deleteItem(item){
      let index = this.todoList.findIndex(element => element.id === item.id);
      this.todoList.splice(index, 1);
      this.completedToDoList.splice(index, 1);
      this.setStorage(this.todoList, this.completedToDoList);
    },

    // Set an item incomplete
    uncompleteItem(item) {
        item.complete = !item.complete;
        let index = this.completedToDoList.findIndex(element => element.id === item.id);
        this.todoList.push(item);
        this.completedToDoList.splice(index, 1);
        this.setStorage(this.todoList, this.completedToDoList);
    },

    // Set Storage
    setStorage(todoList, completedToDoList){
      localStorage.setItem("todolist", JSON.stringify(todoList));
      localStorage.setItem("completedtodolist", JSON.stringify(completedToDoList));
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
  position: relative;
  width: calc(100% - 20px);
  min-height: calc(100% - 20px);
  background: white;
  margin: auto;
}
.lists-container {
  max-height: 65vh;
  overflow-y: scroll;
  padding: 10px;
}
.floating-button {
  position: absolute;
  bottom: 10px;
  width: 60px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  background: #50E3A4;
  border-radius: 50%;
  color: gray;
  cursor: pointer;
  font-size: 18px;
}
.floating-button.add-new-open {
  right: 10px;
}
.floating-button.clear-data{
  left: 10px;
}

.add-item {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 50px);
  height: 60px;
  border-radius: 50px;
  overflow: hidden;
  position: absolute;
  bottom: 80px;
  left: 0;
  background: #50e3a4;
  padding: 0 15px;
  margin: 0 10px;
}
.add-item form {
  flex-basis: 100%;
}

.add-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 2rem;
  cursor: pointer;
}

input {
  background: none;
  border: none;
  width: 100%;
  height: 60px;
  color: black;
  font-size: 1.6rem;
}

input::placeholder {
   color: black;
}

input:focus {
   outline: none;
}

.item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  margin-bottom: 2px;
  overflow: hidden;
  transition: all .5s linear;
}

.item-manage {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: black;
  cursor: pointer;
}
.item-manage i {
  padding: 0 15px;
  font-size: 18px;
}

.item-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.3rem;
  color: black;
}

.complete-list .item {
  position: relative;
}
.complete-list .item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 90%;
  margin: 0;
  border-bottom: 2px solid black;
 }

.show-completed {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.text-center {
  text-align: center;
}
.text-white {
  color: white;
}
.text-black {
  color: black;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>