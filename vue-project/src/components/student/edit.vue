<script setup> 
import {useRoute} from "vue-router"
import { RouterLink } from "vue-router";

import "vue3-toastify/dist/index.css";
import {toast} from "vue3-toastify"

import { onMounted } from "vue";
import useStudent from "../../composable/studentApi";

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
    autoclose:1000,
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
          class="bg-purple-700 text-white font-medium py-2 px-6 rounded-md hover:bg-purple-800 mr-5">Save
        </button>
   
        <RouterLink :to="{name:'list' }">
          <button
            type="button"
            class="bg-emerald-700 text-white font-medium p-2 rounded-md hover:bg-emerald-800">
            Back to Home
          </button>
        </RouterLink>
      </div>
    </form>
    </div>
</template>

<style scoped></style>