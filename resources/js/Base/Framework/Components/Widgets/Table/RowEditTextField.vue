<template>
    <v-edit-dialog
        :return-value="props.item[name]"
        @save="save"
        @cancel="cancel"
        @open="open"
        @close="close"
    >
        <slot></slot>
        <template v-slot:input>
            <v-text-field
                v-model="props.item[name]"
                :label="label"
            ></v-text-field>
        </template>
    </v-edit-dialog>
</template>
<script>
export default {
    name: "TableRowEditTextField",
    methods: {
        save() {
            this.$emit(`RowDataEditor:${this.name}:save`);
        },
        cancel() {
            this.$emit(`RowDataEditor:${this.name}:cancel`);
        },
        open() {
            this.$emit(`RowDataEditor:${this.name}:open`);
        },
        close() {
            this.$emit(`RowDataEditor:${this.name}:close`);
        },
    },
    props: {
        label: {
            required: true,
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
        props: {
            required: true,
        },
    },
};
</script>
<style scoped>
.v-small-dialog__content {
    margin-top: 20px !important;
}
</style>