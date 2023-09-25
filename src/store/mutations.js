export default {
    setSearchTerm(state, term) {
        state.searchTerm = term;
        state.selectedUser = null;
    },
    setUsers(state, users) {
        state.users = users;
    },
    setSelectedUser(state, user) {
        state.selectedUser = user;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
};