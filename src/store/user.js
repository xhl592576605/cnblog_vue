
const _userKey = "cnBlogUser"
import { isLogin, loginOut, jumpLogin } from "@/utils/$login";

const state = {
    user: JSON.parse(window.localStorage.getItem(_userKey)) || {},
    isLogin: isLogin()
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    REMOVE_USER(state) {
        state.user = null
    },
    UPDATE_LOGINSTATE(state) {
        state.isLogin = isLogin();
    }
}

const actions = {
    SET_USER({ commit }, user) {
        window.localStorage.setItem(_userKey, JSON.stringify(user))
        commit('SET_USER', user)
    },
    REMOVE_USER({ commit }) {
        window.localStorage.removeItem(_userKey)
        loginOut();
        commit('REMOVE_USER')
        commit('UPDATE_LOGINSTATE')
    },
    UPDATE_LOGINSTATE({ commit }) {
        commit('UPDATE_LOGINSTATE')
    }
}

export const user = { namespaced: true, state: state, mutations: mutations, actions: actions }