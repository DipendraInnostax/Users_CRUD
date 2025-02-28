import { ref  } from "vue";
import axios from "axios";

export default function useStudent(){
 const URL="http://localhost:3333/students/"
 const studentData=ref([]);
 const error=ref(null);

 const getAllStudent=async()=>{
    studentData.value=[];
    error.value=null;
    try {
        const res=await axios(URL);
        studentData.value=res.data;
        //console.log(studentData.data);
    } catch (err) {
        console.log("error",err);
        err.value=error; 
    }
 }

 const getSingleStudentData=async(id)=>{
    studentData.value=[];
    error.value=null;
    try {
        const res=await axios(URL+id);
        studentData.value=res.data; 
    } catch (err) {
        console.log(err);  
    }
 }


 const createStudent = async (formData) => {
    studentData.value = []
    error.value = null
    try {
      const config = {
        method: 'POST',
        url: URL,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData)
      }
      const res = await axios(config)
      studentData.value = res.data
    } catch (err) {
      console.log(err)
    }
  }

  const editdata=async(id)=>{
    studentData.value=[];
    error.value=null;
    try {
        const res=await axios(URL+id);
        studentData.value=res.data; 
    } catch (err) {
        console.log(err);  
    }
 }

 

 return {
    getAllStudent,
    studentData,
    error,
    getSingleStudentData,
    createStudent,
    editdata
 }
}