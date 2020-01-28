import React from 'react';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { useField } from 'formik';

// solves compatibility issue with Material UI checkbox and Formik. The Material design checkbox does not
// handle change of values
export const Checkbox = ({ ...props }) => {
    const [field] = useField(props.name);

    return (
        <MuiCheckbox {...field} checked={field.value} />
    );
};

