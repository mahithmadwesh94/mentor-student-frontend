import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CreateStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            open: false,
            vertical: 'top',
            horizontal: 'center',
            insertedNames: []

        }
    }

    componentDidMount() {
        if (this.props.location.pathname.includes('create-student')) {
            axios.get('https://mentor-student-api.herokuapp.com/students/')
                .then(response => this.setState({ insertedNames: response.data }, () => {
                    console.log(this.state.insertedNames)
                }))
                .catch(err => console.log(err))
        } else {
            axios.get('https://mentor-student-api.herokuapp.com/mentors/')
                .then(response => this.setState({ insertedNames: response.data }, () => {
                    console.log(this.state.insertedNames)
                }))
                .catch(err => console.log(err))
        }

    }

    handleChange = (event) => {
        this.setState({ name: event.target.value })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleSubmit = (event) => {
        // event.preventDefault();
        if (this.props.location.pathname.includes('create-student')) {
            axios.post('https://mentor-student-api.herokuapp.com/students/add',
                [{ name: this.state.name }]

            ).then(() => this.setState({ open: true }))
                .catch((err) => console.log(err))
        } else {
            axios.post('https://mentor-student-api.herokuapp.com/mentors/add',
                [{ name: this.state.name }]

            ).then(() => this.setState({ open: true }))
                .catch((err) => console.log(err))
        }
        this.setState({ name: '' })
    }

    render() {
        return (
            <>
                <form noValidate autoComplete="off">
                    <h1>Create {this.props.location.pathname.includes('create-student') ? "Student" : "Mentor"}</h1>
                    <TextField style={{ margin: '8px' }} required id="standard-basic" label={`${this.props.location.pathname.includes('create-student') ? "Student" : "Mentor"} Name`} value={this.state.name} onChange={this.handleChange} /><br />
                    <Button type="submit" style={{ margin: '8px' }} variant="contained" color="primary" onClick={this.handleSubmit}>
                        Create {this.props.location.pathname.includes('create-student') ? "Student" : "Mentor"}
                    </Button>
                    <Snackbar open={this.state.open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="success">
                            {this.props.location.pathname.includes('create-student') ? "Student" : "Mentor"} Created
                        </Alert>
                    </Snackbar>
                </form>
                {
                    this.state.insertedNames.length ?

                        (<TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.insertedNames.map((item, index) => (
                                            <TableRow key={item._id}>
                                                <TableCell >{index + 1}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>) : ''}
            </>


        )
    }
}


export default withRouter(CreateStudent);
