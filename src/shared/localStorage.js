export const setPartyCode = (partyCode) => {
    console.log('setting PartyCode')
    localStorage.setItem('partyCode', partyCode);
};

export const getPartyCode = () => {
  return localStorage.getItem('partyCode');
};

export const setName = (name) => {
    localStorage.setItem('name', name)
};

export const getName = () => {
    return localStorage.getItem('name');
};

export const clearLocalStorage = () => {
    localStorage.removeItem('partyCode');
    localStorage.removeItem('name')
};


