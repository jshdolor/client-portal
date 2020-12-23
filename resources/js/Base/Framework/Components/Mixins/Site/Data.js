import SiteService from '~/Application/Services/Sites';

const SiteDataMixin = {
    data() {
        return {
            site: {},
            isFetchingSite: false,
        };
    },
    watch: {
        '$route.params.siteId': {
            immediate: true,
            handler(id) {
                this.isFetchingSite = true;

                SiteService.get(id)
                    .then((data) => (this.site = data))
                    .finally(() => {
                        this.isFetchingSite = false;
                    });
            },
        },
    },
};

export default SiteDataMixin;
