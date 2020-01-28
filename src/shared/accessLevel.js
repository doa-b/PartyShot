export const GUEST = 10;
export const ADMINISTRATOR = 60;

export const ALL = [
    {title: 'Guest', value: GUEST},
    {title: 'Administrator', value: ADMINISTRATOR},
];

export const levelToString = (level) => {
    const result = ALL.filter(access => access.value === level);
    return result[0].title
};