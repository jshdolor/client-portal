export const deviceTypeGroupMap = {
    'TRIGGER Nurse Call': [1, 5, 10],
    'TRIGGER Evacuation': [2, 6, 11],
    'SIREN Evacuation': [3, 7, 10, 11],
    'SIREN Nurse Call': [4, 8],
};

export const deviceTypeGroupIcons = {
    'TRIGGER Nurse Call': {
        icon: 'mdi-plus',
        cls: 'green--text',
    },
    'TRIGGER Evacuation': {
        icon: 'mdi-run',
        cls: 'red--text',
    },
    'SIREN Evacuation': {
        icon: 'mdi-bullhorn',
        cls: 'red--text',
    },
    'SIREN Nurse Call': {
        icon: 'mdi-bullhorn',
        cls: 'green--text',
    },
};
