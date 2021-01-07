import { Theme } from '../../types';

export const fields = {
    name: { label: 'Name', value: '' },
    email: { label: 'Email', validation: /^\S+@\S+\.\S+$/ },
    dob: { label: 'Date of birth', type: 'date' },
    favColor: { label: 'Favourite colour (6 digit hex)', validation: /^\#(?:[0-9a-fA-F]{6}){1}$/ },
    salary: { label: 'Salary', type: 'range' },
};

export const noOfImages = 10;

export const serverDomain = 'http://localhost:5000';

export const theme: Theme = {
    colors: {
        blue: '#0397d8',
        red: '#e72f3d',
        yellow: '#fef200',
    },
};
