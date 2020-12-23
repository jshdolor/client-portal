<script>
import SiteService from "~/Application/Services/Sites";

export default {
    data() {
        return {
            site: {},
            isFetchingSite: false,
        };
    },
    provide() {
        return {
            siteData: () => this.site,
            siteDataLoading: () => this.isFetchingSite,
        };
    },
    methods: {
        async getSiteData(id) {
            this.isFetchingSite = true;
            this.site = await SiteService.get(id);
            this.isFetchingSite = false;
        },
    },
    watch: {
        "$route.params.siteId": {
            immediate: true,
            handler(id) {
                this.getSiteData(id);
            },
        },
    },
};
</script>