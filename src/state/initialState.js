const emptyTrain = {
    dueMins: null,
    destination: ''
}

const emptyLuasStop = {
    stopName: '',
    message: '',
    trainData: {
        inboundTrains: [emptyTrain],
        outboundTrains: [emptyTrain]
    }
}

const emptyBus = {
    dueMins: null,
    destination: '',
    route: '',
    errorMessage: ''
}

const emptyBusStop = {
    stopNumber: null,
    stopName: '',
    buses: [emptyBus]
}


const initialState = {
    trainData: {
        glencairnData: emptyLuasStop,
        gallopsData: emptyLuasStop,
        leopardstownData: emptyLuasStop,
        ballyoganData: emptyLuasStop
    },
    busData: {
        data3470: emptyBusStop,
        data3471: emptyBusStop,
        data3487: emptyBusStop,
        data3488: emptyBusStop,
        data4313: emptyBusStop,
        data4393: emptyBusStop,
        data4395: emptyBusStop,
        data4396: emptyBusStop,
        data4773: emptyBusStop,
        data5106: emptyBusStop,
        data7415: emptyBusStop,
        data7416: emptyBusStop,
        data7417: emptyBusStop,
        data7418: emptyBusStop
    }
}

export default initialState;