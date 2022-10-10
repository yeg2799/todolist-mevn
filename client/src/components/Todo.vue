<template lang="html">
  <div>
    <ul>
      <li v-for='(todo, index) in todos' :key="index">
        <span>{{todo._id}}</span>
        <span>{{todo.name}}</span>
        <span>{{todo.content}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import todoApi from '@/services/todoApi'

export default {
  data () {
    return {
      todos: []
    }
  },
  mounted () {
    this.loadTodos()
  },
  methods: {
    async loadTodos () {
      const response = await todoApi.getToDos()
      this.todos = response.data
    }
  }
}
</script>
<style lang="css">
</style>
