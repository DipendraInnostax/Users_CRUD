<script setup>
    import{ RouterView} from 'vue-router';
</script>

<template>
    <main >
      <div className=" p-5 bg-gray-600 ">
        <h1 className="text-xl md:text-2xl font-semibold text-center text-white  ">
          Welcome To VueJS CRUD Application For User Details
        </h1>
      </div>
       <RouterView/>  
    </main>
</template>

<style scoped>
</style>
