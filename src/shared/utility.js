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
    newArray.sort(compareValues(orderKey));
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
