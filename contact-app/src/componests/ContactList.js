import React from 'react';
import ContactCard from './ContactCard';
// we import {} bocause it is not default components
import {Link} from 'react-router-dom';



const ContactList = (props) => {
    //console.log(props);
    const deleteConactHandler = (id) => {
        props.getContactId(id);
    };
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHander={deleteConactHandler} key={contact.id}></ContactCard>
        );
    });
    return (
        <div className="main">
            <h2>Contact List</h2>
            <Link to="/add"><button className="ui button blue right">Add Contact</button></Link>
            <div className="ui celled list">{renderContactList}</div>
        </div>
    );
}


export default ContactList;