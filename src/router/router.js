let configs = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: {
            cache: true
        }
    },
    {
        path: "/news",
        name: "news",
        component: () => import("@/views/News.vue"),
        meta: {
            cache: true
        }
    },
    {
        path: "/flashMemory",
        name: "flashMemory",
        component: () => import("@/views/FlashMemory.vue"),
        meta: {
            cache: true
        }
    },
    {
        path: "/question",
        name: "question",
        component: () => import("@/views/Question.vue"),
        meta: {
            cache: true
        }
    },
    {
        path: "/self",
        name: "self",
        component: () => import("@/views/Self.vue"),
        meta: {
            cache: true
        }
    },
    {
        path: "/blogApp",
        name: "blogApp",
        component: () => import("@/views/BlogApp.vue"),
        meta: {
            cache: false
        }
    },
    {
        path: "/blogDetail",
        name: "blogDetail",
        component: () => import("@/views/BlogDetail.vue"),
        meta: {
            cache: false
        }
    },
    {
        path: "/knowledgeDeatil",
        name: "knowledgeDeatil",
        component: () => import("@/views/KnowledgeDeatil"),
        meta: {
            cache: false
        }
    }
];

export default configs;
