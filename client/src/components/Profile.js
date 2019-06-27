import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import ContentEditable from 'react-contenteditable'
import { update } from './UserFunctions';
import ImageUpload from './ImageUpload'

export class Profile extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            errors: {}
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            id: decoded.id,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        })
        console.log(this.state.first_name)

        sessionStorage.setItem('userName', decoded.first_name);

    }
    handleContentEditable = (name,event) => {
        
        if(name==="first_name"){
            this.setState({ first_name: event.target.value })
        }
        if(name==="last_name"){
            this.setState({ last_name: event.target.value })
        }
        
        
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email
        }
        console.log(user)
        update(user).then(res => {
            if (res) {
                this.props.history.push(`/update`)
            }
        })
    }


    render() {
        return (

            <div className="container" {...this.state}>
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">PROFILE</h1>
                    <ImageUpload/>

                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>User ID</td>
                                <td>{this.state.id}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>First Name</td>
                                <td><ContentEditable
                                    html={this.state.first_name}
                                    data-column="item"
                                    className="content-editable"
                                    onChange={(e) => this.handleContentEditable("first_name", e)}
                                    onSubmit={(e) => this.handleContentEditable("first_name", e)}
                                /></td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td><ContentEditable
                                    html={this.state.last_name}
                                    data-column="item"
                                    className="content-editable"
                                    onChange={(e) => this.handleContentEditable("last_name", e)}
                                    onSubmit={(e) => this.handleContentEditable("last_name", e)}
                                /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile
