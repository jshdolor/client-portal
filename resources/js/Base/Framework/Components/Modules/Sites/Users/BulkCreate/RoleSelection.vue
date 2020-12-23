<template>
    <v-card>
        <v-card-title>
            <slot></slot>
        </v-card-title>
        <v-card-text class="bulk-modal-container py-5">
            <v-radio-group v-model="internalValue">
                <v-radio
                    v-for="presetRole in permissionPresets"
                    :key="presetRole.name"
                    :value="presetRole.name"
                >
                    <template slot="label">
                        <div>
                            <span class="preset-role-name">{{
                                presetRole.name
                            }}</span>
                            <br />
                            <span class="preset-role-description">{{
                                presetRole.description
                            }}</span>
                        </div>
                    </template>
                </v-radio>
            </v-radio-group>
        </v-card-text>
        <v-card-actions>
            <slot name="actions" />
        </v-card-actions>
    </v-card>
</template>

<script>
import { permissionPresets } from "~/Application/Config/Sites/User/Permissions";

export default {
    name: "BulkCreateRoleSelection",
    data() {
        return {
            permissionPresets,
        };
    },
    computed: {
        internalValue: {
            set(value) {
                this.$emit("roleSelection:roleSelect", value);
            },
            get() {
                return this.role;
            },
        },
    },
    props: {
        role: {
            default: "",
        },
    },
};
</script>

<style scoped>
.preset-role-name {
    font-size: 20px;
    color: #424242;
}
.preset-role-description {
    font-size: 14px;
    color: #9e9e9e;
}
.v-radio {
    align-items: baseline;
}
</style>