<script setup>

import {useRoute} from "vue-router"
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import useStudent from "../../composable/useStudentApi";

const route = useRoute();

const { getSingleStudentData, studentData } = useStudent();

onMounted(async () => {
  await getSingleStudentData(route.params.id)
  //console.log(studentData)
});

</script>

<template>
  <div class="mx-auto">
    <table class="table-auto mx-auto w-2/3">
      <thead class="bg-blue-500 text-white">
        <tr>
          <th class="py-1">ID</th>
          <th class="py-1">Name</th>
          <th class="py-1">Email</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr>
          <td class="py-2 shadow-sm">{{studentData.id}}</td>
          <td class="py-2 shadow-sm"> {{ studentData.stuname}}</td>
          <td class="py-2 shadow-sm">{{ studentData.email}}</td>
        </tr>
      </tbody>
    </table>
    <div class="m-8 flex justify-center">
      <RouterLink :to="{ name:'list' }">
        <button
          type="button"
          class="bg-emerald-700 text-white font-medium p-2 rounded-md hover:bg-emerald-800"
        >
          Back to Home
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>