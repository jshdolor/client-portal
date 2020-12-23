<template>
    <aside id="sidebar" class="sidebar c-overflow">
        <div class="s-profile">
            <a href data-ma-action="profile-menu-toggle">
                <div class="sp-info">
                    {{name}}
                    <i class="zmdi zmdi-caret-down"></i>
                </div>
            </a>
            <ul class="main-menu">
                <li v-for="(navLink, i) of filteredUserMenu" :key="i">
                    <a :href="navLink.path" @click.prevent="goTo(navLink.path, navLink.reload)">
                        <i :class="navLink.icon"></i>
                        {{navLink.label}}
                    </a>
                </li>
            </ul>
        </div>
        <ul class="main-menu">
            <li v-for="(navLink, i) of filteredAppMenu" :key="i">
                <a :href="navLink.path" @click.prevent="goTo(navLink.path, navLink.reload)">
                    <i :class="navLink.icon"></i>
                    {{navLink.label}}
                </a>
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
    name: "Sidebar",

    data() {
        return {
            userMenu: [],
            appMenu: []
        };
    },

    methods: {
        goTo(path, isNative = false) {
            if (isNative) {
                window.location.href = path;
            }

            this.$router.push(path);
        }
    },

    computed: {
        filteredAppMenu() {
            return this.appMenu.filter(link =>
                link.access.some(hasAccess => hasAccess)
            );
        },
        filteredUserMenu() {
            return this.userMenu.filter(link =>
                link.access.some(hasAccess => hasAccess)
            );
        },
        name() {
            return window.user_name;
        }
    },

    mounted() {}
};
</script>
