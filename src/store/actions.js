import axios from 'axios';

export default {
    async searchUsers({ commit, state }) {
        try {
            if (!state.searchTerm) {
                return;
            }

            commit('setLoading', true);

            const searchTermArray = state.searchTerm.split(',').map(item => item.trim());
            const searchParams = searchTermArray.every(item => !isNaN(item))
                ? searchTermArray.map(id => `id=${id}`).join('&')
                : searchTermArray.map(username => `username=${username}`).join('&');

            const response = await axios.get(`https://jsonplaceholder.typicode.com/users?${searchParams}`);
            const usersData = Array.isArray(response.data) ? response.data : [response.data];

            commit('setUsers', usersData);
        } catch (error) {
            commit('setUsers', []);
            console.error('Ошибка при выполнении запроса:', error);
        } finally {
            commit('setLoading', false);
        }
    },
};