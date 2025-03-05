import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore",()=>{

    const users=ref([
        { id: 1, name:"Amit", email: "amit@example.com" },
        { id: 2, name:"Aman", email: "aman@example.com" },
        { id: 3, name:"Arpit", email: "amit@example.com" },
        { id: 4, name:"Arnav", email: "amit@example.com" },
        { id: 5, name:"Aarush", email: "amit@example.com" },
        { id: 6, name:"Ayush", email: "amit@example.com" },
        { id: 7, name:"Aditya", email: "amit@example.com" },
        { id: 8, name:"Akshat", email: "amit@example.com" },
        { id: 9, name:"Adarsh", email: "amit@example.com" }
    ]);

    const addUser=(user)=>{
        //console.log("Added",user)
      user.id=Date.now();
      users.value.push(user);
    }

    const updateUser = (updatedUser) => {
        console.log("updated",updatedUser)
        const index = users.value.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          users.value[index] = updatedUser;
        }
        
      };
    

    const deleteUser=(id)=>{
        console.log("deleted")
        users.value=users.value.filter(user=>user.id!==id);
    }  
    

      return { users, addUser, updateUser, deleteUser };

})