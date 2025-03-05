import { ref  } from "vue";
import axios from "axios";



export default function useStudent(){
 const URL="http://localhost:3000/students/"

 const studentData=ref([]);
 const error=ref(null);

 
 const getAllStudent=async()=>{
    studentData.value=[];
    error.value=null;
    try {
        const res=await axios(URL);
        studentData.value=res.data;
        
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


  const editdata=async(id,data)=>{
    // if (event) event.preventDefault();
    // studentData.value=[];
    // error.value=null;
    try {
      const config = {
        method: 'PUT',
        url: URL + id,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      }
      
      const res = await axios(config)
      studentData.value = res.data

     // toast.success("Updated User Successfully")
      
    } catch (err) {
      console.log(err)
    }
 }


 const destroyStudent = async (id) => {
  try {
    const config = {
      method: 'DELETE',
      url: URL + id,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios(config)
    studentData.value = res.data
    //console.log(res)
  } catch (err) {
    console.log(err);
  }
}



 return {
    getAllStudent,
    studentData,
    getSingleStudentData,
    createStudent,
    editdata,
    destroyStudent
 }
}
