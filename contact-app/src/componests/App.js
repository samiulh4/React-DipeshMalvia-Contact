
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
//import { uuid } from "uuidv4";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import api from '../api/contacts';

// After Error
import { v4 as uuidv4 } from 'uuid';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);


  // RetrieveContacts
  const retriveContacts = async () =>{
    const response = await api.get('/');
    return response.data;
  };

  const addContactHandler = async (contact) => {
    //setContacts([...contacts, { id: uuid(), ...contact }]);
    
    //setContacts([...contacts, { id: uuidv4(), ...contact }]);
    const request = {
      id: uuidv4(),
      ...contact
    }
    const response  = await api.post('/', request);
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    //const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //if (retriveContacts) setContacts(retriveContacts);
    const getAllContact = async () => {
      const allContact = await retriveContacts();
      if(allContact) setContacts(allContact);
    };
    getAllContact();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    // after package.json replace from git course source code this portion of code not working
    // if(contacts?.length) { 
    //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    // }
    // only store the state if contacts exists and it's length is greater than 0 
  }, [contacts]);





  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />)} />
          <Route path="/add" render={(props) => (<AddContact {...props} addContactHandler={addContactHandler} />)} />
          <Route path="/contact/:id" component={ContactDetails} />
        </Switch>
        {/* 
        <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
