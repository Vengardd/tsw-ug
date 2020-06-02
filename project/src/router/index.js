import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import MyBids from "../views/MyBids.vue";
import MyAuctions from "../views/MyAuctions.vue";
import AuctionForm from "../views/AuctionForm.vue";
import Error404 from "../views/Error404.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/my-bids",
        name: "MyBids",
        component: MyBids
    },
    {
        path: "/my-auctions",
        name: "MyAuctions",
        component: MyAuctions
    },
    {
        path: "/my-history",
        name: "MyHistory",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import("../views/MyHistory.vue");
        }
    },
    {
        path: "/auction",
        name: "AuctionForm",
        component: AuctionForm
    },
    {
        path: "/404",
        name: "Error404",
        component: Error404
    }
];

const router = new VueRouter({
    mode: "history",
    base: "",
    routes
});

const isInRoutes = (name) => {
    const routeNames = [];
    router.options.routes.forEach(route => {
        routeNames.push(route.name);
    });
    return routeNames.includes(name);
};

router.beforeEach((to, from, next) => {
    store.dispatch("fetchCurrentUser");
    // console.log("Route " + to.path + " is " + isInRoutes(to.name));
    if (to.name === "Error404") {
        // next({ name: "Error404" }); DONT (Infinite recursion)
    } else if (!isInRoutes(to.name)) {
        console.log("Error 404");
        next({ name: "Error404" });
    } else if (to.name === "Register" || to.name === "Home" || to.name === "Auction") {
        next();
    } else if (to.name !== "Login" && !store.getters.currentUser.isAuth) {
        console.log("Not logged in. Redirecting to login page");
        next({ name: "Login" });
    } else if (to.name === "Login" && store.getters.currentUser.isAuth) {
        console.log("Logged in. Redirecting to home page");
        next({ name: "Home" });
    } else {
        // console.log("Other");
        next();
    }
});

export default router;
