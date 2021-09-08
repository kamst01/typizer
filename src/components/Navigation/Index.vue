<script setup>
import NavigationLinks from './NavigationLinks.vue'
</script>

<script>
export default {
    props: {
        navClass: {
            type: String,
            required: false,
        },
        navLinksClass: {
            type: String,
            required: false,
        }
    }
}
</script>
<template>
    <nav :class="navClass" aria-labelledby="navigationHeading">
        <h2 id="navigationHeading" class="sr-only" aria-hidden="true">Navigation</h2>
        <NavigationLinks :linksClass="navLinksClass" />
    </nav>
</template>
