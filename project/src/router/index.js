import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import AuctionOwnList from "../components/AuctionOwnList";
import MessageSending from "../components/MessageChooser";
import Navbar from "../components/Navbar.vue";
import AuctionNew from "../components/AuctionNew.vue";
import AuctionWithBids from "../components/AuctionWithBids.vue";
import AuctionBidList from "../components/AuctionBidList";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/myAuctions",
        name: "MyAuctions",
        component: AuctionOwnList
    },
    {
        path: "/navbar",
        name: "Navbar",
        component: Navbar
    },
    {
        path: "/messenger",
        name: "Messenger",
        component: MessageSending
    },
    {
        path: "/newAuction",
        name: "NewAuction",
        component: AuctionNew
    },
    {
        path: "/bid",
        name: "Bid",
        component: AuctionWithBids,
        props: true
    },
    {
        path: "/bidList",
        name: "AuctionWithBids",
        component: AuctionBidList
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ "../views/About.vue");
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
