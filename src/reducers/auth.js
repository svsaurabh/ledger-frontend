const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
};

export default function (state = initialState, action) {
    return state;
}
