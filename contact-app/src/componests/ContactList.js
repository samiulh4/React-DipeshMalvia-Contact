import React, { useRef } from 'react';
import ContactCard from './ContactCard';
// we import {} bocause it is not default components
import { Link } from 'react-router-dom';



const ContactList = (props) => {
    //console.log(props);
    const inputEl = useRef("");
    const deleteConactHandler = (id) => {
        props.getContactId(id);
    };
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHander={deleteConactHandler} key={contact.id}></ContactCard>
        );
    });
    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
        //console.log('Search Input Element', inputEl.current.value);
    };
    return (
        <div className="main">
            <h2>Contact List</h2>
            <Link to="/add"><button className="ui button blue right">Add Contact</button></Link>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" className="prompt" placeholder="Search Contact" value={props.term} onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No Contact Availabel"}</div>
        </div>
    );
}


export default ContactList;