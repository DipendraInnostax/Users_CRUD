<!-- <script setup> 

import {useRoute} from "vue-router"
import { RouterLink } from "vue-router";

import "vue3-toastify/dist/index.css";
import {toast} from "vue3-toastify"

import { onMounted } from "vue";
import useStudent from "../../composable/useStudentApi";

const route = useRoute();

const { editdata, studentData,getSingleStudentData } = useStudent();

onMounted(async () => {
  await getSingleStudentData(route.params.id)
  //console.log(studentData)
});


function handleUpdateStudentForm() {
  editdata(route.params.id,studentData.value)
  //console.log("updated");
  //preventDefault()
   toast.success("Updated User Successfully",{
     autoclose: 1000 
    })
}
</script>

<template>
  <div >
    <div class="bg-indigo-400 mx-auto w-2/3 p-4">
      <h1 class="text-3xl font-bold text-center text-white">Edit Student</h1>
    </div>
   
    <form class="w-2/3 mx-auto">
      <div class="flex items-center m-6">
        <div class="w-1/5">
          <label class="font-medium">ID:</label>
        </div>
        <div class="w-3/5">
          <input
            type="text"
            id="stuid"
            class="border-2 border-gray-200 w-full py-2 px-4"
            readonly
            disabled
            v-model.trim="studentData.id"
          />
        </div>
      </div>
      <div class="flex items-center m-6">
        <div class="w-1/5">
          <label class="font-medium" for="stuname">Name :</label>
        </div>
        <div class="w-3/5">
          <input
            type="text"
            id="stuname"
            class="border-2 border-gray-200 w-full py-2 px-4"
            required
            v-model.trim="studentData.stuname"
          />
        </div>
      </div>
      <div class="flex items-center m-6">
        <div class="w-1/5">
          <label class="font-medium" for="email"> Email : </label>
        </div>
        <div class="w-3/5">
          <input
            type="email"
            id="email"
            class="border-2 border-gray-200 w-full py-2 px-4"
            required
            v-model.trim="studentData.email"
          />
        </div>
      </div>

      <div class="m-8 flex justify-center">
       
        <button
          @click.prevent="handleUpdateStudentForm" 
          type="submit"
          class="bg-purple-700 text-white font-medium py-2 px-6 rounded-md hover:bg-purple-800 mr-5 cursor-pointer">Save
        </button>
   
        <RouterLink :to="{name:'list' }">
          <button
            type="button"
            class="bg-emerald-700 text-white font-medium p-2 rounded-md hover:bg-emerald-900 cursor-pointer">
            Back to Home
          </button>
        </RouterLink>
      </div>
    </form>
    </div>
</template>

<style scoped></style> -->



<script setup>
import { useUserStore } from '../../stores/userStore';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const userId = route.params.id;
const user = ref(
  { name: '',
    email: '' });


onMounted(() => {
  const foundUser = userStore.users.find((u) => u.id == userId);
  if (foundUser) {
    user.value = { ...foundUser }; 
  }
});

const saveChanges = () => {
  userStore.updateUser(user.value);
  router.push('/'); 
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4 text-center">Edit User</h2>
      
      <input
        v-model="user.name"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        type="text"
        placeholder="Enter name"
      />
      
      <input
        v-model="user.email"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        type="email"
        placeholder="Enter email"
      />
      
      <button 
        @click="saveChanges"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>
