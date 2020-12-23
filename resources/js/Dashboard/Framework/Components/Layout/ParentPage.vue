<template>
    <div>
        <Navbar />
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "@dashboard/Framework/Components/Modules/Sites/Navbar";

export default {
    name: "ParentPageLayout",

    components: {
        Navbar,
    },
};
</script>