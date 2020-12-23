
<script>
import AuthService from "~/Application/Services/Auth";

export default {
    name: "VanguardBaseApplication",

    data() {
        return {
            isInitialized: false,
        };
    },

    mounted() {
        this.isInitialized = true;
    },
};
</script>