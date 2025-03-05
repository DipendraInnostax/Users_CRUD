import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
    const URL="http://localhost:3000/students/"
    const users = ref([])


  const fetchUsers = async () => {
    try {
      const response = await fetch(URL)
      users.value = await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  
  const addUser = async (user) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const newUser = await response.json()
      users.value.push(newUser)
      console.log("added");

    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

 
  const updateUser = async (id,updatedUser) => {
    
    try {
      const response = await fetch(`${URL}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      })
      if (response.ok) {
        const index = users.value.findIndex(user => user.id ===id)
        if (index !== -1) users.value[index] = updatedUser
        console.log("Updated User ");
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

 
  const deleteUser = async (id) => {
    try {
      const response = await fetch(URL+id, { method: 'DELETE' })
      if (response.ok) {
        users.value = users.value.filter(user => user.id !== id)
        console.log("deleted");
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  onMounted(fetchUsers)

  return { users, fetchUsers, addUser, updateUser, deleteUser }
})
