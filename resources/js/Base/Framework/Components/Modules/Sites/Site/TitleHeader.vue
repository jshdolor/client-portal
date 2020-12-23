<template>
    <div class="text-center">
        <div class="text-vanguard-h1 text-vanguard-bold site-title">
            {{ site.name }} ({{ site.siteId }})
        </div>
        <div class="text-vanguard-h5">{{ site.address }}</div>
        <div class="text-vanguard-h5">{{ site.timezone }}</div>
        <div class="text-vanguard-body-1">{{ site.status }} Status</div>
        <div class="text-vanguard-body-1 d-none">
            {{
                site.creator
                    ? `${this.site.creator.name} <${this.site.creator.email}>`
                    : ""
            }}
            {{ site.createdAt }}
        </div>
    </div>
</template>
<script>
export default {
    name: "SiteTitle",
    inject: ["siteData"],
    computed: {
        site() {
            return this.siteData();
        },
    },
};
</script>

<style scoped>
.site-title {
    font-size: 75px;
}
</style>