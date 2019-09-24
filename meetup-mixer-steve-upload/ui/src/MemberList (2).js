import React from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddUser from "./AddUser";
import "./TopicList.css";


import { makeStyles, useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import MembersIcon from '@material-ui/icons/Group';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableFooter,
    TablePagination,
    IconButton
} from "@material-ui/core";




const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event) {
        onChangePage(event, 0);
    }

    function handleBackButtonClick(event) {
        onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event) {
        onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



const useStyles2 = makeStyles(theme => ({
    root: {
        width: '66%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableHeader: {
        backgroundColor: '#D3D3D3'
    },
    tableHead: {
        fontSize: 20,
        fontStyle: 'Bold'
    },
    tableHeaderInstructions: {
        fontSize: 12,
        fontStyle: 'Italic',
        alignContent: 'Right',
    },
}));



export default function CustomPaginationActionsTable() {
//export class CustomPaginationActionsTable extends React.Component{
//    constructor(props) {
//        super(props);


//        this.state = {
//            page,0
//            set
//            page: 0,
//            rowsPerPage: 10,
//            onSelectedName: "Fred"
//        };
//    }


    const classes = useStyles2();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage,] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, 14 - page * rowsPerPage);

    
    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

   function handleClick(property) {
        // nameClicked = property;
       console.log(property)
       //selectedUser=property
       // console.log(this.state.props)
        //props.selectedUser(property);    
       // console.log(props.selectedUser)

    }



        return (
            <Query
                query={gql`
          query PersonPaginateQuery(
            $first: Int
            $offset: Int
            $orderBy: _PersonOrdering

          ) {
            sortedMembers( first: $first, offset: $offset,orderBy:$orderBy) {
                name
                }  
            }
        `}
                variables={{
                    first: rowsPerPage,
                    offset: rowsPerPage * page
                    //mySelect: this.props.data
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;
                    console.log(data);

                    return (

                        <Paper className={classes.root}>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.table}>
                                    <TableHead >
                                        <TableRow className={classes.tableHeader}>
                                            <TableCell className={classes.tableHead}>< MembersIcon /> Members
                                            <div className={classes.tableHeaderInstructions}> Select your name</div>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {data.sortedMembers
                                            .map(row => (
                                                <TableRow key={row.name} onClick="">
                                                    <TableCell component="th" scope="row" onClick={() => handleClick(row.name)}>
                                                        <a href="#"> {row.name}</a>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 48 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                        <TableRow>
                                            <TableCell colSpan={6} ><AddUser /></TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                colSpan={3}
                                                count={14}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: { 'aria-label': 'rows per page' },
                                                    native: true,
                                                }}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                        </Paper>
                    );

                }}
            </Query>
        )

}
