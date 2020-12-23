<template>
    <v-switch
        :disabled="isSubmitting"
        @change="toggle"
        :input-value="value"
    ></v-switch>
</template>
<script>
export default {
    name: "AsyncSwitch",
    props: {
        value: { type: Boolean },
        service: {
            required: true,
            type: Function,
        },
    },
    data() {
        return {
            isSubmitting: false,
            internalValue: this.value,
        };
    },
    methods: {
        async toggle(value) {
            this.isSubmitting = true;
            try {
                const status = await this.service();
                this.$emit("input", value);
            } catch (e) {
                //return to old value
                this.$emit("input", !value);
            }

            this.isSubmitting = false;
        },
    },
};
</script>
