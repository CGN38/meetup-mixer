import React from 'react';
import "./AddUserTopic.css"
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import {
    TableCell,
} from "@material-ui/core";


const AddUserTopic = ({ mutate, user, topic } ) => {

   
    console.log(23,user,topic)
    const handleClick = () => {    
            mutate({
                variables: {from:user, to: topic },
            })

           // refresh the page
            window.location.reload(false);
        }
 
    return (
        <TableCell scope="row" onClick={handleClick}>
            <a href="#">{topic}</a>
        </TableCell>
    );
}; 


const addUserTopicMutation  = gql`
  mutation AddUserTopic($from: String,$to:String) {
    AddUserTopic(from: $from, to:$to) {
      name
    }
  }
`;
const AddUserTopicMutation = graphql(
    addUserTopicMutation
)(AddUserTopic);


export default AddUserTopicMutation ;
