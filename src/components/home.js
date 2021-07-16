import React, { Component } from 'react'
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentorData: []
        }
    }


    componentDidMount() {
        axios.get('https://mentor-student-api.herokuapp.com/mentors/')
            .then(response => this.setState({ mentorData: response.data }, () => {
                console.log(this.state.mentorData)
            }))
            .catch(err => console.log(err))

    }
    render() {
        return (
            <div className="container">
                <h1>Assigned Data</h1>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Students</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.mentorData.map((item, index) => (
                                    <TableRow key={item._id}>
                                        <TableCell >{index + 1}</TableCell>
                                        <TableCell >{item.name}</TableCell>
                                        <TableCell>{item.students.join(',')}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        )
    }
}
