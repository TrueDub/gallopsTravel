import BusReducer from "./BusReducer";
import TramReducer from "./TramReducer";

export default function gallopsApp(state = {}, action) {
    return {
        trainData: TramReducer(state.trainData, action),
        busData: BusReducer(state.busData, action)
    }
}