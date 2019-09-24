import React from 'react';
import "./AddUserTopic.css"
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import {
    TableCell,
} from "@material-ui/core";


const DeleteUserTopic = ({ mutate, user, topic } ) => {

   
    console.log(24,user,topic)
    const handleClick = () => {    
            mutate({
                variables: {from:user, to: topic },
            })

           // refresh the page
           window.location.reload(false);
        }
 
    return (
        <TableCell style={{ fontWeight: 'Bold' ,background:'#EEEEEE'}} scope="row" onClick={handleClick}>
            <a href="#" style={{ background: '#EEEEEE' }}>{topic}</a>
        </TableCell>
    );
}; 


const deleteUserTopicMutation  = gql`
  mutation DeleteUserTopic($from: String,$to:String) {
    DeleteUserTopic(from: $from, to:$to) {
      name
    }
  }
`;
const DeleteUserTopicMutation = graphql(
    deleteUserTopicMutation
)(DeleteUserTopic);


export default DeleteUserTopicMutation ;

