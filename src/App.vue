<script setup>
import Header from "./components/header/Index.vue";
import Footer from './components/Footer.vue';
import Typizer from './components/Typizer.vue';
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Header -->
        <Header />
        <!-- Main Content -->
        <main class="-mt-24 pb-8" aria-labelledby="contentHeading">
            <h1 id="contentHeading" class="sr-only" aria-hidden="true">Content</h1>
            <Typizer />
        </main>
        <!-- Footer -->
        <Footer />
    </div>
</template>
