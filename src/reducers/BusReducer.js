import PropTypes from "prop-types";

export default function () {
    return [
        {
            stopNumber: 1,
            stopName: "stop1",
            errorMessage: '',
            buses: [{
                dueMins: 1,
                destination: "dest1",
                route: "63",
                errorMessage: ''
            }]
        },
        {
            stopNumber: 2,
            stopName: "stop2",
            errorMessage: '',
            buses: [{
                dueMins: 2,
                destination: "dest2",
                route: "65",
                errorMessage: ''
            }]
        },
        {
            stopNumber: 3,
            stopName: "stop3",
            errorMessage: '',
            buses: [{
                dueMins: 3,
                destination: "dest3",
                route: "67",
                errorMessage: ''
            }]
        }
    ];
}