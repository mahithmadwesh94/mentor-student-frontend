import { FormControl, InputLabel, MenuItem, Select, Button } from '@material-ui/core'
import axios from 'axios';

import React, { Component } from 'react'

export default class ChangeMentor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentNames: [],
            mentorNames: [],
            previousMentor: '',
            newMentor: '',
            selectedStudentName: '',
            mentorId: ''
        }
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
        this.setState({ selectedStudentName: event.target.value })
        console.log(event.target.value)
        axios.get(`https://mentor-student-api.herokuapp.com/mentors/student-mentor/${event.target.value}`)
            .then(response => this.setState({ previousMentor: response.data.length ? response.data[0]["_id"] : '', mentorId: response.data.length ? response.data[0]["_id"] : '' }))
            .catch((err) => console.log(err))
    }

    handleMentorChange = (event) => {
        if (this.state.previousMentor !== event.target.value) {
            this.setState({ newMentor: event.target.value })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.newMentor && this.state.newMentor !== this.state.previousMentor) {
            axios.post(`https://mentor-student-api.herokuapp.com/mentors/remove-student/${this.state.previousMentor}`)
                .then(() => alert('mentor updated'))
                .catch((err) => console.log(err))
        }

    }


    render() {
        return (
            <div className="container">
                <FormControl style={{ minWidth: 300 }}>
                    <InputLabel >Select Student</InputLabel>
                    <Select

                        value={this.state.selectedStudentName}
                        onChange={this.handleChange}
                    >
                        {
                            this.state.studentNames.map((item) => (
                                <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl><br />

                <FormControl style={{ minWidth: 300, marginTop: '30px' }}>
                    <InputLabel>Select Mentor</InputLabel>
                    <Select
                        value={this.state.mentorId}
                        onChange={this.handleMentorChange}
                    >
                        {
                            this.state.mentorNames.map((item) => (
                                <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>

                    <Button type="submit" style={{ margin: '8px' }} variant="contained" color="secondary" onClick={this.handleSubmit}>
                        Update Assignment
                    </Button>
                </FormControl>

            </div>
        )
    }
}
