import React from 'react';
import "./AddUser.css"
import gql from "graphql-tag";
import { graphql } from "react-apollo";


const AddTopic = ({ mutate }) => {

    const handleKeyUp = (evt) => {
        if (evt.keyCode === 13) {
            console.log(evt.target.value);
            evt.persist();
            mutate({
                variables: { name: evt.target.value },

            })
                .then(res => {
                    evt.target.value = '';
                });
            // refresh the page
            window.location.reload(false);
        }
    };

    return (
        <div id="addRecord">+	&nbsp;
        <input
                type="text"
                placeholder="New Topic"
                onKeyUp={handleKeyUp}
            />

        </div>
    );
};


const addChannelMutation = gql`
  mutation MergeTopic($name: String) {
    MergeTopic(name: $name) {
      name
    }
  }
`;
const AddTopicWithMutation = graphql(
    addChannelMutation
)(AddTopic);


export default AddTopicWithMutation;
