
        

<template>
    <ListCard
        title="Internet Stability"
        :listData="displayData"
        :titleSize="summary && summary.hasTcu ? 'large' : 'normal'"
    >
        <template v-slot:title-value v-if="summary && summary.hasTcu">
            <v-icon :size="61" :color="internetConnectionStabilityToday.color">
                {{ internetConnectionStabilityToday.icon }}
            </v-icon>
            <div
                :class="
                    internetConnectionStabilityToday.color +
                    '--text status-text '
                "
            >
                {{ internetConnectionStabilityToday.status }}
            </div>
        </template>
        <template v-slot:subtitle
            ><div class="custom-card-list-subtitle">Today</div></template
        >
    </ListCard>
</template>
<script>
import SummaryMixin from "../SummaryMixin";
import { valueWithIcon } from "~/Framework/Helpers/Component";

export default {
    name: "InternetStabilityCard",
    mixins: [SummaryMixin],

    computed: {
        displayData() {
            const currentMonth = this.summary.hasTcu
                ? valueWithIcon(
                      this.summary.internetConnectionStabilityCurrentMonth ||
                          {},
                      true
                  )
                : null;
            return [
                {
                    title: "This Month",
                    value: currentMonth,
                },
            ];
        },

        internetConnectionStabilityToday() {
            return this.summary.internetConnectionStabilityToday || {};
        },
    },
};
</script>

<style >
.custom-card-list-subtitle {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.6);
    padding-left: 10px;
}
</style>