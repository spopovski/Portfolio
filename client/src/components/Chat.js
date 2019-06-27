import React from "react";
import io from "socket.io-client";


class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageID: '',
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('localhost:5000');

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data]});
        };


        this.sendMessage=(ev) => {
            ev.preventDefault();
            if (this.state.message.trim() !== "") {
                this.socket.emit('SEND_MESSAGE', {
                    author: sessionStorage.getItem('userName'),
                    message: this.state.message
                });
                this.setState({ message: '' });
            }
        }
    }
    handleClick = (index) => this.setState({ activeIndex: index })

    onChat = (e) => {
        if (String(e.target.value).trim() !== "") {
            this.setState({ message: e.target.value })
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {

        return (


            <div className="chat-container">
                <div className="card-body">
                    <div className="card-title" style={{ fontSize: 30 }}>Global Chat</div>
                    <hr />
                    <div className="messages">
                        {this.state.messages.map((message, index) => {
                            return (
                                <div className={`sender`} key={index}><div className="author">{message.author}</div><div className="message">{message.message}</div></div>
                            )
                        })}
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>

                </div>
                <footer className="footer">
                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={this.onChat.bind(this)} />

                    <button onClick={this.sendMessage} style={{ width: 300 }} className="btn btn-primary form-control">Send</button>
                </footer>
            </div>


        );
    }
}

export default Chat;