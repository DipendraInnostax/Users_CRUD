 import { createRouter , createWebHistory } from "vue-router";
 import add from "@/components/student/add.vue";
 import edit from "@/components/student/edit.vue";
 import list from "@/components/student/list.vue";
 import view from "@/components/student/view.vue";
 import notFound from "@/view/notFound.vue";

 const routes=[
    {
    path:'/',
    name:'list',
    component:list
    },
    {
        path:'/:pathMatch(.*)*',
        name:'notFound',
        component:notFound
    },
    {
        path:'/view/:id',
        name:'view',
        component:view
    },
    {
        path:'/add',
        name:'add',
        component:add
    },
    {
        path:'/edit/:id',
        name:'edit',
        component:edit
    }

]

 const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
 })

 export default router