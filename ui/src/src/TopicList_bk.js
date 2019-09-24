import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddTopic from "./AddTopic";
import "./TopicList.css";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import { withStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Paper,
    TableSortLabel,
    TableFooter,
    TablePagination
} from "@material-ui/core";


const styles = theme => ({
    root: {
        maxWidth: 700,
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto",
        margin: "auto"
    },
    table: {
        minWidth: 700
    }
});

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




class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.nameClicked = "";
 
        this.state = {
            order: "asc",
            orderBy: "name",
            page: 0,
            rowsPerPage: 10
            
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    };



    handleClick = property => {
        this.nameClicked = property;

    };



    render() {
        const { order, orderBy } = this.state;
        console.log(2, this.props.data)

       // let selectedName = this.props.data
        //this.setState({ selectedName})
       // console.log(3, this.state.selectedName)

        return (
            <Query
                query={gql`
          query TopicPaginateQuery(
            $first: Int
            $offset: Int
            $orderBy: _TopicOrdering
          ) {
            Topic( first: $first, offset: $offset, orderBy: $orderBy) {
                name
                }  
            }
        `}
                variables={{
                    first: this.state.rowsPerPage,
                    offset: this.state.rowsPerPage * this.state.page,
                    orderBy: this.state.orderBy + "_" + this.state.order,
                    mySelect:this.props.data
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;

              
                    return (
                        <Paper className={this.props.classes.root}>

                            <Table className={this.props.classes.table} Width="100">
                                <TableBody>
   
                                    {                                       
                                        data.Topic.map(n => {
                                        //{data.Topic.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => (                                          
                                            return (
                                                <TableRow>
                                                    <TableCell component="th" scope="row" onClick={() => this.handleClick(n.name)}>
                                                        <a href="#">{n.name}</a>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })

                                    }

                                    <TableRow>
                                        <TableCell>
                                            <AddTopic />
                                        </TableCell>

                                    </TableRow>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                colSpan={3}
                                                count={this.state.count}
                                                rowsPerPage={this.state.rowsPerPage}
                                                page={this.state.page}
                                                SelectProps={{
                                                    inputProps: { 'aria-label': 'rows per page' },
                                                    native: true,
                                                }}
                                                onChangePage={this.handleChangePage}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}                                               
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </TableBody>
                            </Table>
                        </Paper>
                    );
                }}
            </Query>

        );

    }
}


export default withStyles(styles)(TopicList);

//export default (UserList);

