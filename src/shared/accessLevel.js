export const GUEST = 10;
export const ORGANISER = 20;
export const ARTIST = 30;
export const ADMINISTRATOR = 60;

export const ALL = [
    {title: 'Guest', value: GUEST},
    {title: 'Administrator', value: ADMINISTRATOR},
    {title: 'Organiser', value: ORGANISER},
    {title: 'Artist', value: ARTIST}
];

export const levelToString = (level) => {
    const result = ALL.filter(access => access.value === level);
    return result[0].title
};