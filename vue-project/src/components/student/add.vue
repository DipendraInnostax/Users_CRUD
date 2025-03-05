<!-- <script setup>
import { reactive } from "vue";
import { RouterLink } from "vue-router";

import { useToast } from "vue-toastification";
const toast = useToast();

import useStudent from "../../composable/useStudentApi";

const { createStudent } = useStudent();

const formData = reactive({
  stuname: "",
  email: "",
});

const handleAddStudentForm = async () => {
  
  if (!formData.stuname || !formData.email) {
      toast.error("Required Field !!");
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Invalid Email Format !!" );
      return;
    }

  try {

    await createStudent(formData);
    toast.success("User Added Successfully!",{
     autoclose: 1000 
    });
    //prevent.default();
  }
   catch (error) {
    console.error("Error adding student:", error);
    toast.error("Something went wrong while user addition!",{
     autoclose: 1000 
    });
  }
};



</script>

<template>
  <div class="w-2/3 mx-auto">

    <div class="bg-green-500 p-4 ">
      <h1 class="text-3xl font-bold text-center text-white">Add Student</h1>
    </div>
   
      <div class="flex items-center m-6">
        <div class="w-1/5">
          <label class="font-medium" for="stuname">Name :</label>
        </div>
        <div class="w-4/5">
          <input
            type="text" id="stuname" class="border-2 border-gray-200 w-full py-2 px-4" v-model.trim="formData.stuname"
            placeholder="write your name" required/>
        </div>
      </div>

      <div class="flex items-center m-6">
        <div class="w-1/5">
          <label class="font-medium" for="email">Email :</label>
        </div>
        <div class="w-4/5">
          <input
            type="email" id="email" class="border-2 border-gray-200 w-full py-2 px-4" placeholder="write your email" v-model.trim="formData.email" required/>
        </div>
      </div>

      <div class="m-8 flex justify-center">
        <button type="button" @click="handleAddStudentForm" 
          class="bg-green-500 text-white font-medium py-2 rounded-md px-6 hover:bg-purple-800 mr-6 cursor-pointer"> Add </button>

        <RouterLink :to="{name:'list'}">
          <button type="button" class="bg-pink-600 text-white font-medium p-2 rounded-md hover:bg-emerald-800 cursor-pointer">
            Back to Home
          </button>
        </RouterLink>
      </div>

    </div>
</template>

<style scoped>
</style> -->



<script setup>
import { useUserStore } from '../../stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const newUser = ref({
  name: '',
  email: '',
});

const addUser = () => {
  userStore.addUser(newUser.value); 
  router.push('/'); 
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4 text-center">Add New User</h2>
      
      <input
        v-model="newUser.name"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
        type="text"
        placeholder="Enter name"
       
      />
      
      <input
        v-model="newUser.email"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
        type="email"
        placeholder="Enter email"
        
      />
      
      <button 
        @click="addUser"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-300"
      >
        Save
      </button>
    </div>
  </div>
</template>

