import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddUser from "./AddUser";
import "./MemberList.css";

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


class MemberList extends React.Component {
   
    constructor(props) {
        super(props);

        this.state = {
            order: "asc",
            orderBy: "name",
            page: 0,
            rowsPerPage: 10,
            rowCount: 8,
            emptyRows:0,
        };

    }
    handleClick =  property  => {
        // console.log(1,property)
        //alert(property + " has been selected" )
        this.props.callbackFromParent(property)

        //go to Topics page
    
    };

    ///pagination //////////////////////////////////


    handleChangePage =(event, newPage) =>{
        this.setState({ page: newPage })
    }

    handleChangeRowsPerPage = event =>  {
        this.setState({ rowsPerPage: event.target.value })
    }

   
    ///pagination end ///////////////////

   
    render() {


        return (
          
            <Query
                query={gql`
          query PersonPaginateQuery(
            $first: Int
            $offset: Int
            $orderBy: _PersonOrdering
          ) {
            sortedMembers(first: $first, offset: $offset, orderBy: $orderBy) {
              name
            },
            Person{
              name
            }
          }
              
        `}
                variables={{
                    first: this.state.rowsPerPage,
                    offset: this.state.rowsPerPage * this.state.page,
                    orderBy: this.state.orderBy + "_" + this.state.order,
                }}
            >
               
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;

                    return (
                        <Paper style={{width: '66%'}}>
                            <Table>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: '#D3D3D3' }}>
                                        <TableCell style={{fontSize: 20, fontStyle: 'Bold'}}><AssignmentIcon />
                                            Members
                                    <div style={{ fontSize: 12, fontStyle: 'Italic', alignContent: 'Right' }}> Select your name</div>
                                        </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.sortedMembers
                                        .map(n => {
                                        return (
                                            <TableRow key={n.id}>
                                                <TableCell component="th" scope="row" onClick={() => this.handleClick(n.name)}>
                                                    <a href="#">{n.name}</a>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow>
                                        <TableCell>
                                            <AddUser />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableFooter>
                                   
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={data.Person.length}
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


export default (MemberList);

