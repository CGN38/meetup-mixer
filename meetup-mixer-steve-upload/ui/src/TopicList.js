import React from "react";
import { Query} from "react-apollo";
import { graphql } from "react-apollo";

import gql from "graphql-tag";
import AddTopic from "./AddTopic";
import "./TopicList.css";
import NonSelectedTopics from "./NonSelectedTopics"
import SelectedTopics from "./SelectedTopics"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableFooter,
    TablePagination,
} from "@material-ui/core";

import AssignmentIcon from '@material-ui/icons/Assignment';


class TopicList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            order: "asc",
            orderBy: "name",
            page: 0,
            rowsPerPage: 10,
            rowCount: 5,
            emptyRows: 0,
            selectedtopic: "",

        };

    }
    handleClick = property => {
        // console.log(1,property)
        // alert(property + " has been selected")
        this.props.callbackFromParent(property)

    };

    handleRemoveTopic = property => {
        console.log(3, property)
        this.setState({ selectedTopic: property })

    };

    ///pagination //////////////////////////////////


    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value })
    }


    ///pagination end ///////////////////


    render() {

        return (

            <Query
                query={gql`
          query TopicPaginateQuery(
            $first: Int
            $offset: Int
            $orderBy: _TopicOrdering
            $name: String
          ) {
            notSelectedTopics(first: $first, offset: $offset, orderBy: $orderBy,name:$name) {
              name
            },            
            notSelectedTopicsCount(name:$name){name} ,
            selectedTopics(name:$name){name} 
          }
        `}
                variables={{
                    first: this.state.rowsPerPage,
                    offset: this.state.rowsPerPage * this.state.page,
                    orderBy: this.state.orderBy + "_" + this.state.order,
                    name: this.props.selectedUser,
                    topic: this.state.selectedTopic
                }}
            >

                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;
                    console.log(1, this.props)
                    console.log(2, this.state)
                    console.log(3, data)

                    return (
                        <Paper style={{ width: '66%' }}>
                            <Table>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: '#D3D3D3' }}>
                                        <TableCell style={{ fontSize: 20, fontStyle: 'Bold' }}><AssignmentIcon />
                                            Topics
                                    <div style={{ fontSize: 12, fontStyle: 'Italic', alignContent: 'Right' }}> Select your interests</div>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.selectedTopics.map(n => {
                                            //{data.Topic.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => (                                          
                                            return (
                                                <TableRow style={{ backgroundColor: '#EEEEEE' }}>
                                                    <SelectedTopics user={this.props.selectedUser} topic={n.name} />
                                                </TableRow>
                                            );
                                        })
                                        
                                    }
                                    <TableRow style={{ backgroundColor: '#D3D3D3', height: 1 }}><TableCell style={{ backgroundColor: '#D3D3D3', height: 1 }}></TableCell></TableRow>
                                    {
                                    data.notSelectedTopics.map(n => {
                                            //{data.Topic.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => (                                          
                                            return (
                                                <TableRow key={n.id}>
                                                    <NonSelectedTopics user={this.props.selectedUser} topic={n.name} />
                                                </TableRow>
                                            );
                                        })

                                    }
                                    <TableRow>
                                        <TableCell>
                                            <AddTopic />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableFooter>

                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={data.notSelectedTopicsCount.length}
                                            rowsPerPage={this.state.rowsPerPage}
                                            page={this.state.page}
                                            backIconButtonProps={{
                                                'aria-label': 'previous page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'next page',
                                            }}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        />
                                    </TableRow>

                                </TableFooter>
                            </Table>
                        </Paper>
                    );
                }}
            </Query>
        );
    }
}


export default (TopicList);

