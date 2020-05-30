<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <p> siema </p>
  </div>
</template>

<script>

import PostService from "../PostService";

export default {
    name: "Login",
    data () {
        return {
            posts: [],
            error: "",
            text: ""
        };
    },
    async created () {
        try {
            this.posts = await PostService.getPosts();
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async createPost () {
            await PostService.insertPost(this.text);
            this.posts = await PostService.getPosts();
        },
        async deletePost (id) {
            await PostService.deletePost(id);
            this.posts = await PostService.getPosts();
        }
    }
};
