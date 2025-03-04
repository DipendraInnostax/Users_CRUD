<script setup>
import { reactive } from "vue";
import { RouterLink } from "vue-router";

import useStudent from "../../composable/studentApi";

const { studentData, error, createStudent } = useStudent();

const formData = reactive({
  stuname: "",
  email: "",
});

const handleAddStudentForm = async () => {
  await createStudent(formData);
};
</script>

<template>
  <div class="w-2/3 mx-auto">

    <div class="bg-green-500 p-4 ">
      <h1 class="text-3xl font-bold text-center text-white">Add Student</h1>
    </div>
   
    <form
      @submit.prevent="handleAddStudentForm"
      class=" w-3/4 mx-auto"
      id="AddStudentForm"
    >
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
        <button
          type="submit" class="bg-green-500 text-white font-medium py-2 rounded-md px-6 hover:bg-purple-800 mr-6" > Add </button>

        <RouterLink :to="{name:'list'}">
          <button type="button" class="bg-pink-600 text-white font-medium p-2 rounded-md hover:bg-emerald-800">
            Back to Home
          </button>
        </RouterLink>
      </div>
    </form>

    </div>
</template>

<style scoped>
</style>
