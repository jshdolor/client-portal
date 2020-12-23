export const getConditionalIcon = (
    value,
    icons = ['mdi-checkbox-marked-circle', 'mdi-checkbox-blank-circle-outline'],
    truthyValue = (v) => {
        return !!v;
    }
) => {
    const [trueIcon, falseIcon] = icons;

    return truthyValue(value) ? trueIcon : falseIcon;
};

export const valueWithIcon = (data, iconAfter = false) => {
    const innerHTML = iconAfter
        ? `${data.status} <i class="mdi ${data.icon}"></i>`
        : `<i class="mdi ${data.icon}"></i> ${data.status}`;
    return `<div class="${data.color}--text">${innerHTML}</div>`;
};
