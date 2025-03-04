<script setup>

import "vue3-toastify/dist/index.css";
import { useToast } from "vue-toastification";
 const toast = useToast();

import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/solid";

import { ref  } from "vue";
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import useStudent from "../../composable/studentApi";


const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedStudent = ref(null);
const deleteStudentId = ref(null);
const deletedStates = ref({});


const {getAllStudent, studentData ,destroyStudent, getSingleStudentData} = useStudent();

onMounted(async () => {
  await getAllStudent()
 // console.log(studentData.data);
});


const markForDeletion = (id) => {
  deletedStates.value[id] = true;
};


const openDeleteModal = (id) => {
  deleteStudentId.value = id;
  markForDeletion(id);
  isDeleteModalOpen.value = true;
  
};


const confirmDelete = async () => {
  if (!deleteStudentId.value) return;

  await destroyStudent(deleteStudentId.value);
  toast.success("Deleted User Details", {
     autoclose: 1000 
    });

  await getAllStudent();
  isDeleteModalOpen.value = false;
  deleteStudentId.value = null;
};


const cancelDelete = () => {
  if (deleteStudentId.value) {
    deletedStates.value[deleteStudentId.value] = false;
  }
  isDeleteModalOpen.value = false;
  deleteStudentId.value = null;
};


const openModal = async (id) => {
  selectedStudent.value = null;
  //console.log("id" ,id);

  await getSingleStudentData(id);
  selectedStudent.value = studentData.value;
 
  // console.log("studentData:", studentData.value);
  // console.log("selectedStudent:", selectedStudent.value);
  isModalOpen.value = true; 
};

const closeModal = async() => {
  isModalOpen.value = false;
  selectedStudent.value = null;
  await getAllStudent();
};

const obfuscateEmail = (email) => {
  if (!email) return "N/A"; 
  return email.replace(/(\w{1})[\w.-]+@([\w.-]+)\.(\w{2,})/, '$1***@$2.***');
};

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

        <RouterLink :to="{ name:'add' }">
          <button
            class="text-white text-md  bg-green-700 hover:bg-green-800 font-medium rounded-md mr-12 p-2 px-6 cursor-pointer">
            <UserPlusIcon class="h-8"/> Add New
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
      <tr v-for="({ id, stuname, email }, i) in studentData" :key="id"
      :class="{ 'line-through': deletedStates[id] }">
          <td class="py-2 shadow-sm">{{ ++i }}</td>
          <td class="py-2 shadow-sm">{{ stuname }}</td>
          <td class="py-2 shadow-sm ">{{obfuscateEmail(email)}}</td>
        <td class="py-2 shadow-lg">
          
            
          <button @click="openModal(id)">
              <EyeIcon class="text-blue-400 h-5 w-5 inline cursor-pointer" />
            </button>

          <RouterLink v-if="id" :to="{ name:'edit',params:{id:id}}">
            <PencilIcon class="text-emerald-500 h-5 w-5 inline mx-6 cursor-pointer" />
          </RouterLink>

          <button @click="openDeleteModal(id)">
            <TrashIcon class="text-red-500 h-5 w-5 inline cursor-pointer" />
          </button>
          
        </td>
      </tr>
    </tbody>
  </table>

  <!-- // view modal -->
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center backdrop-blur-lg w-full mx-auto">
      <div class="bg-green-500 p-5 rounded-lg shadow-lg w-2/5 mx-auto ">
       <div class="bg-white p-4 rounded-md text-center" >

        <h2 class="text-xl font-bold mb-2">Student Details</h2>
        <p ><strong>ID:</strong> {{  selectedStudent.id}}</p>
        <p><strong>Name:</strong> {{  selectedStudent.stuname}}</p>
        <p><strong>Email:</strong> {{  selectedStudent.email}}</p>


       </div>
        <div class="mt-4 flex justify-end">
          <button
            @click="closeModal"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>

      <!-- //delete modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 flex items-center justify-center w-full mx-auto">
    <div class="bg-red-300 p-5 rounded-lg shadow-lg w-2/5 mx-auto">
      <div class="bg-white p-4 rounded-md text-center">
        <h1 class="text-xl font-bold mb-2 text-red-600">Confirm Deletion</h1>
        <p class="text-lg">Are you sure you want to delete this student?</p>
      </div>
      <div class="mt-4 flex justify-between gap-2">
        <button @click="confirmDelete" class="bg-red-500 text-white px-4 py-2 mx-auto  rounded hover:bg-red-900 cursor-pointer">
          Yes, Delete
        </button>
        <button @click="cancelDelete" class="bg-gray-400 text-white px-4 py-2 mx-auto rounded hover:bg-gray-600 cursor-pointer">
          Cancel
        </button>
      </div>
    </div>
  </div>



</template>

<style scoped>
.line-through {
  text-decoration: line-through;
  opacity: 0.6;
}</style>
