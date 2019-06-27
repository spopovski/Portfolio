import React, { Component } from 'react'
import { getList, addToList, deleteItem, updateItem } from './ListFunctions'
import '../index.css'

export class List extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      term: '',
      editDisabled: false,
      items: [],
      filtered: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.filterList = this.filterList.bind(this);
    this.filterUser = this.filterUser.bind(this);

  }

  componentDidMount() {
    this.getAll()
  }

  onChange = event => {
    this.setState({ term: event.target.value, editDisabled: 'disabled' })
  }

  filterList = (e) => {
    let updatedList = []
    let currentList = []
    if (e.target.value !== "") {
      currentList = this.state.items;
      updatedList = currentList.filter((item) => String(item.task_name).includes(e.target.value)).map(({ id, task_name, created_by, created_at, updated_at }) => ({ id, task_name, created_by, created_at, updated_at }))
      console.log(updatedList)

    }
    else {
      updatedList = this.state.items;
    }
    this.setState({ filtered: updatedList });
  }

  filterUser = (e) => {
    let updatedList = []
    let currentList = []
    if (e.target.value !== "") {
      currentList = this.state.items;
      updatedList = currentList.filter((item) => String(item.created_by).includes(e.target.value)).map(({ id, task_name, created_by, created_at, updated_at }) => ({ id, task_name, created_by, created_at, updated_at }))
      console.log(updatedList)

    }
    else {
      updatedList = this.state.items;
    }
    this.setState({ filtered: updatedList });
  }

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          term: '',
          filtered: [...data].reverse(),
          items: [...data].reverse()
        },
        () => {
          console.log(this.state.items)
        }
      )
    })
  }
  componentWillMount() {
    this.setState({ items: this.state.items })
  }
  onSubmit = e => {
    e.preventDefault()
    addToList(this.state.term, sessionStorage.getItem("userName")).then(() => {
      this.getAll()
    })
    this.setState({ editDisabled: false })


  }
  onUpdate = e => {
    e.preventDefault()
    updateItem(this.state.term, sessionStorage.getItem("userName"), this.state.id).then(() => {
      this.getAll()
    })
    this.setState({ editDisabled: false })
  }

  onEdit = (item, itemid, e) => {
    e.preventDefault()
    this.setState({
      id: itemid,
      term: item
    })
  }

  onDelete = (val, e) => {
    e.preventDefault()
    deleteItem(val).then(() => {
      this.getAll()
    })
  }

  render() {
    return (
      <div className="col-md-12" style={{ marginTop: 50 }}>
        <form onSubmit={this.onSubmit} style={{ display: "inline-block", marginBottom: 50 }}>
          <div className="form-group">
            <div className="row" style={{ marginRight: -10 }}>
              <div className="col-md-9" style={{ display: "flex" }}>
                <input
                  placeholder="Enter Text"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={this.state.term || ''}
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="col-md-2" style={{ paddingLeft: 0 }}>
                <button
                  className="btn btn-primary"
                  onClick={this.onUpdate.bind(this)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={this.onSubmit.bind(this)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </form>
        <table className="table table-bordered table-hover table-stripped list-table" style={{ color: "rgba(255, 255, 255, 0.5)", border: "rgba(255, 255, 255, 0.5)", backgroundColor: "#343a40" }}>
          <thead>
            <tr className="container">
              <th className="container" style={{ width: "50%" }}><input type="text" className="form-control input" style={{ textAlign: "left", position: "relative" }} onChange={this.filterList} placeholder="Search by Task..." />Tasks</th>
              <th style={{ width: "7%" }}><input type="text" className="form-control input" style={{ textAlign: "left", position: "relative" }} onChange={this.filterUser} placeholder="Search by User..." />Last Change By</th>
              <th style={{ width: "8%" }}>Created On</th>
              <th style={{ width: "8%" }}>Last Update</th>
              <th style={{ width: "8%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filtered.map((item, index) => (
              <tr key={index} >
                <td className="text-left" style={{ wordBreak: "break-all", width: "50%" }}>{item.task_name}</td>
                <td style={{ width: "7%" }}>{item.created_by}</td>
                <td style={{ width: "8%" }}>{item.created_at}</td>
                <td style={{ width: "8%" }}>{item.updated_at}</td>
                <td style={{ width: "8%" }}>
                  <button
                    href=""
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(this, item.task_name, item.id)}
                  >
                    Edit
                  </button>
                  <button
                    href=""
                    className="btn btn-danger"
                    onClick={this.onDelete.bind(this, item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default List