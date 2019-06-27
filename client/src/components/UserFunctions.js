import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })  
        .then(res => {
            console.log("Registered")
        }).catch(err => {
            console.log(err)
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })

}

export const update = user => {
    console.log(user)
    return axios
        .post('users/update', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })

}