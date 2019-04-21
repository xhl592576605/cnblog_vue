const _apiAuthorizeTokenKey = "cnBlogAuthorizeToken";
const _refreshTokenKey = "cnBlogRefreshToken";
const _userKey = "cnBlogUser"
import { getLoginUsers } from "@/api/user";

const state = {
    user: JSON.parse(window.localStorage.getItem(_userKey)) || {}
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    REMOVE_USER(state) {
        state.user = null
    }
}

const actions = {
    SET_USER({ commit }, user) {
        window.localStorage.setItem(_userKey, JSON.stringify(user))
        commit('SET_USER', user)
    },
    REMOVE_USER({ commit }) {
        window.localStorage.removeItem(_userKey)
        commit('REMOVE_USER')
    }
}

export const user = { namespaced: true, state: state, mutations: mutations, actions: actions }