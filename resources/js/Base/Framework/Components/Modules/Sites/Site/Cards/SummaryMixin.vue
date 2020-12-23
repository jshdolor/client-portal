<script>
export default {
    name: "SiteSummaryMixin",
    inject: ["summaryData"],
    computed: {
        summary() {
            return this.summaryData();
        },
    },
};
</script>