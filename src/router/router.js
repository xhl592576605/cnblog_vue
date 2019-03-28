
let configs = [
    {
        path: "/",
        name: "home",
        component: () => 
            import("@/views/Home.vue")
        
    },
    {
        path: "/news",
        name: "news",
        component: () => 
            import("@/views/News.vue")
        
    },
    {
        path: "/flashMemory",
        name: "flashMemory",
        component: () => 
            import("@/views/FlashMemory.vue")
        
    },
    {
        path: "/question",
        name: "question",
        component: () => 
            import("@/views/Question.vue")
        
    },
    {
        path: "/self",
        name: "self",
        component: () => 
            import("@/views/Self.vue")
        
    },
    {
        path: "/blogApp",
        name: "blogApp",
        component: () => 
            import("@/views/BlogApp.vue")
        
    },{
        path:"/blogDetail",
        name:"blogDetail",
        component:()=>
            import("@/views/BlogDetail.vue")
    },{
        path:"/knowledgeDeatil",
        name:"knowledgeDeatil",
        component:()=>
            import("@/views/KnowledgeDeatil")
    }
];

export default configs;
