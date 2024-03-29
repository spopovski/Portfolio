import axios from 'axios'

export const getList = () => {
  return axios
    .get('/api/tasks', {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      return res.data
    })
}

export const addToList = (term,user) => {
  return axios
    .post(
      '/api/task',
      {
        task_name: term,
        created_by: user,
        updated_at: new Date()
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(function(response) {
      console.log(response)
    })
}

export const deleteItem = term => {
  return axios
    .delete(`/api/task/${term}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
}
export const updateItem = (term,user, id) => {
  return axios
    .put(
      `/api/task/${id}`,
      {
        task_name: term,
        updated_at: new Date(),
        created_by: user
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(function(response) {
      console.log(response)
    })
}