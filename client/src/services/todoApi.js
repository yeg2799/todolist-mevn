import api from '@/services/api.js'
export default {
  getToDos () {
    return api().get('todo')
  }
}
