<script>
export default {
    props: {
        linksClass: {
            type: String,
            required: false,
        }
    }
}
</script>
<template>
    <a href="/" :class="linksClass" aria-current="page">
        Home
    </a>
    <!-- <a href="#" :class="linksClass">
        Profile
    </a>
    <a href="#" :class="linksClass">
        Resources
    </a>
    <a href="#" :class="linksClass">
        Company Directory
    </a>
    <a href="#" :class="linksClass">
        Openings
    </a> -->
</template>