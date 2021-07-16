import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { Component } from 'react';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class AssignMentor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mentorNames: ['Test1', 'Test2'],
            selectedMentor: '',
            studentNames: ['Student 1', 'Student 2'],
            selectedStudentNames: [],
            open: false
        }
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    componentDidMount() {
        axios.get('https://mentor-student-api.herokuapp.com/mentors/')
            .then(response => this.setState({ mentorNames: response.data }, () => {
                console.log(this.state.mentorNames)
            }))
            .catch(err => console.log(err))

        axios.get('https://mentor-student-api.herokuapp.com/students/')
            .then(response => this.setState({ studentNames: response.data }, () => {
                console.log(this.state.studentNames)
            }))
            .catch(err => console.log(err))
    }

    handleChange = (event) => {
        this.setState({ selectedMentor: event.target.value })
        axios.get(`https://mentor-student-api.herokuapp.com/mentors/students/${event.target.value}`)
            .then(response => this.setState({ selectedStudentNames: response.data ? response.data : [] }))
            .catch((err) => console.log(err))
    }

    handleStudentChange = (event) => {
        console.log(event.target.value)
        this.setState({ selectedStudentNames: event.target.value })
    }

    handleSubmit = (event) => {

        axios.put(`https://mentor-student-api.herokuapp.com/mentors/assign-students/${this.state.selectedMentor}`, {
            students: this.state.selectedStudentNames
        })
            .then(() => this.setState({ open: true }))
            .catch((err) => console.log(err))
    }
    render() {
        return (
            <div className="container">
                <FormControl style={{ minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label">Select Mentor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.selectedMentor}
                        onChange={this.handleChange}
                    >
                        {
                            this.state.mentorNames.map((item) => (
                                <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl><br />
                <FormControl style={{ minWidth: 300, marginTop: '30px' }}>
                    <InputLabel id="demo-simple-select-label">Select Students</InputLabel>
                    <Select
                        multiple
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.selectedStudentNames}
                        onChange={this.handleStudentChange}
                    >
                        {
                            this.state.studentNames.map((item) => (
                                <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                    <Button type="submit" style={{ margin: '8px' }} variant="contained" color="primary" onClick={this.handleSubmit}>
                        Insert Assignment
                    </Button>
                    <Snackbar open={this.state.open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="success">
                            Mentor Assignment Updated
                        </Alert>
                    </Snackbar>
                </FormControl>
            </div>
        )
    }
}
