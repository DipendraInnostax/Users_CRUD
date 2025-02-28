<script setup>
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/solid";
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import useStudent from "../../composable/studentApi";

const { getAllStudent, studentData, error } = useStudent();

onMounted(async () => {
  await getAllStudent()
 // console.log(studentData.data);
  
});


const deleteUser = async (id) => {
  console.log("delete")
  if (!window.confirm("Are you sure")); {
    return
  }
}
</script>

<template>
  <div>
    <div class="bg-gray-500 p-3 grid grid-cols-9 w-full">
      <div class="col-span-6 md:col-span-8">
        <h1 class="text-2xl font-bold text-center mt-2 text-white">
          Student List
        </h1>
      </div>
      <div class="text-right">

        <RouterLink :to="{ name: 'add' }">
          <button
            class="text-white text-md bg-green-700 hover:bg-green-800 font-medium rounded-lg p-2 px-6 cursor-pointer">
            <UserPlusIcon /> Add
          </button>
        </RouterLink>

      </div>
    </div>
  </div>

  <table class="table-auto w-3/4 mx-auto">
    <thead class="bg-indigo-400 text-white">
      <tr>
        <th class="py-1">No</th>
        <th class="py-1">Name</th>
        <th class="py-1">Email</th>
        <th class="py-1">Action</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr v-for="({ id, stuname, email }, i) in studentData" :key="id">
          <td class="py-2 shadow-sm">{{ ++i }}</td>
          <td class="py-2 shadow-sm">{{ stuname }}</td>
          <td class="py-2 shadow-sm">{{ email }}</td>
        <td class="py-2 shadow-lg">
          <RouterLink :to="{ name:'view',params:{ id:id } }">
            <EyeIcon class="text-blue-500 h-5 w-5 inline cursor-pointer" />
          </RouterLink>
          <RouterLink :to="{ name: 'edit', params:{ id:id}}">
            <PencilIcon class="text-emerald-500 h-5 w-5 inline mx-6 cursor-pointer" />
          </RouterLink>
          <RouterLink>
            <TrashIcon class="text-red-500 h-5 w-5 inline cursor-pointer" @click="deleteUser(1)" />
          </RouterLink>

        </td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped></style>
