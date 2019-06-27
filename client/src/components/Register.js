import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            errorFN: '',
            errorLN: '',
            errorEmail:'',
            errorPass:'',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    changeText = (e) => {
        if(e.target.name==="first_name"){
            this.setState({ errorFN: '' });
        }
        if(e.target.name==="last_name"){
            this.setState({ errorLN: '' });
        }
        if(e.target.name==="email"){
            this.setState({ errorEmail: '' });
        }
        if(e.target.name==="password"){
            this.setState({ errorPass: '' });
        }
     }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            errorFN: this.state.errorFN,
            errorLN: this.state.errorLN,
            errorEmail:this.state.errorEmail,
            errorPass:this.state.errorPass
        }

        let countErr=0
        if(user.first_name.trim()===""){
            this.setState({errorFN: "First name cannot be empty"})
            countErr+=1
            console.log(this.state.errorFN)
        }
        if(user.last_name.trim()===""){
            this.setState({errorLN: "Last name cannot be empty"})
            countErr+=1
            console.log(this.state.errorLN)
        }
        if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(user.email)){
            this.setState({errorEmail: "Invalid email adress"})
            countErr+=1
            console.log(this.state.errorEmail)
        }
        if(user.password.length<4){
            this.setState({errorPass: "The password cannot be less that 4 symbols"})
            countErr+=1
            console.log(this.state.errorPass)
        }
        if(countErr===0){
            register(user).then(res => {
                this.props.history.push(`/login`)
        })}
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                            <label htmlFor="first_name">First Name</label><br/>
                            <label className="validation-error" htmlFor="first_name">{this.state.errorFN}</label>
                                <input type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter Fist Name"
                                    value={this.state.first_name}
                                    onClick = {this.changeText}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label><br/>
                                <label className="validation-error" htmlFor="last_name">{this.state.errorLN}</label>
                                <input type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter Last Name"
                                    value={this.state.last_name}
                                    onClick = {this.changeText}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label><br/>
                                <label className="validation-error" htmlFor="email">{this.state.errorEmail}</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onClick = {this.changeText}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label><br/>
                                <label className="validation-error" htmlFor="password">{this.state.errorPass}</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onClick = {this.changeText}
                                    onChange={this.onChange}
                                />
                            </div>
                            
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Register!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register