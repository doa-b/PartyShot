import * as local from "./localStorage";
import * as ROUTES from "./routes";

export const createUUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

export const generatePassword = (length) => {
       const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
       let retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};

export const createUniquePartyCode = (firebase) => {
    return new Promise(resolve => {
        firebase.parties().once('value')
            .then((snapshot) => {
                console.log(snapshot.val());
                let number = 0;
                do {
                    number = Math.floor(Math.random() * 1000000);
                } while (snapshot.child(number).exists());
                resolve('000000')
            });
    })

};

export const msToDate = (miliseconds) => {
    const date = new Date(miliseconds);
    return date.toDateString();
};

export const durationToDateTime = (duration) => {
    const date = new Date(duration);
    console.log(date)
    return date;
};
export const dateToMs = (date) => {
    return date.getUTCMilliseconds()
};

export const msToTime = (miliseconds, withSeconds, withHours = true) => {
    // add leading zero for number <10
    const alz = (value) => {
        return (value < 10) ? '0' + value : value;
    };

    var milliseconds = parseInt((miliseconds % 1000) / 100),
        seconds = Math.floor((miliseconds / 1000) % 60),
        minutes = Math.floor((miliseconds / (1000 * 60)) % 60),
        hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
    const showHours = (withHours) ? alz(hours) + ':' : '';


    if (withSeconds) {
        return showHours + alz(minutes) + ":" + alz(seconds)
    } else return showHours + alz(minutes);
};

export const getCurrentUTCinMs = () => {
    var currentDate = new Date();
    return currentDate.getTime() - currentDate.getTimezoneOffset() * 60000;
};

// function that sets an object immutably
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
};

export const convertObjectsAndSortByKey = (object, orderKey, order = 'asc') => {
    // convert object of objects into array of objects, when you do not need the orderKey
    // let newArray = Object.values(object);

    // convert object of objects into array of objects, when you DO not need the orderKey
    let newArray = [];
    for (let key in object) {
        newArray.push(
            {
                ...object[key],
                id: key
            });
    }

    // sort array of objects by order orderKey
    newArray.sort(compareValues(orderKey, order));
    return newArray;
};

export const convertObjectstoArray = (object) => {
    // convert object of objects into array of objects, when you do not need the Key
    // let newArray = Object.values(object);

    // convert object of objects into array of objects, when you DO not need the Key
    let newArray = [];
    for (let key in object) {
        // check if object has a nested object

        newArray.push(
            {
                ...object[key],
                id: key
            });
    }
    return newArray;
};

export const convertArrayToObject = (elementsArray, idField) => {
    let newObject = {};
    elementsArray.map((element) => {
        const newElement = {...element};
        delete newElement[idField]; // delete idField in object
        return newObject[element[idField]] = newElement;
    });
    return newObject;
};
