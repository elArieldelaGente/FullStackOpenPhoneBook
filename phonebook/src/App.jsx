/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Display from './components/Display'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {

      const [persons, setPersons] = useState([])
      const [newName, setNewName] = useState('')
      const [newNumber, setNewNumber] = useState('')
      const [search, setSearch] = useState('')
      const [filtered, setFiltered] = useState([])
      const [displayFiltered, setDisplayFiltered] = useState(false)
      const [addMessage, setAddMessage] = useState(null)

      //Usando async await
      /* const hook = ( ) => {
            (async () => {
                  const response = await axios.get('http://localhost:3001/persons')
                  setPersons(response.data)
            })()
      } */


      const hook = (  ) => {
            personsService
                  .getAll()
                  .then(initialPersons => {
                        setPersons(initialPersons)
                  })     
      }

      useEffect(hook, [])

      const handleSearch = (e) => {
            setSearch(e.target.value)
            
            if (e.target.value ==='') {
                  setDisplayFiltered(false)
                  return
            }

            const filterSearch = persons.filter( person => 
                  person.name.toLowerCase().includes(e.target.value.toLowerCase()))
            
            if (filterSearch.length !== 0){
                  setFiltered(filterSearch)
                  setDisplayFiltered(true)
                  return
            }
      }


      const handleNewName = (e) => {
            setNewName(e.target.value)
      }
      

      const handleNewNumber = (e) => {
            setNewNumber(e.target.value)
      }
      

      const addPerson = (e) => {
            e.preventDefault()
            const isPresent = persons
                  .map(person => person.name.toLowerCase())
                  .includes(newName.toLowerCase())

            if(isPresent){
                  
                  const existentPerson = persons.filter( person => 
                        person.name.toLowerCase() === newName.toLowerCase()
                  )
                  const personObject = existentPerson[0]
                  personObject.number = newNumber

                  personsService
                        .updatePerson(personObject.id, personObject)
                        .then( personUpdated => {

                              setPersons( persons.map(person => 
                                    person.name.toLocaleLowerCase() !== newName.toLocaleLowerCase() ? person : personUpdated))

                              setAddMessage({
                                    text:`${personObject.name} updated succesfully`,
                                    style: 'success'})

                         })
                         .catch(err => {
                              console.log(err);

                              setAddMessage({
                                    text:`${personObject.name} was removed from database`,
                                    style: 'fail'})           
                              
                              setPersons(persons.filter(person => person.id !== personObject.id))
                         }) 
                  
                  
            } else {

                  const newPerson = {
                        name: newName,
                        number: newNumber
                  }

                  personsService
                        .createPerson(newPerson)
                        .then( newPerson => 
                              setPersons(persons.concat(newPerson))
                        )

                  setAddMessage({
                                    text:`${newPerson.name} added succesfully`,
                                    style: 'success'})
            }
            
            setNewName('')                                    
            setNewNumber('')
            setTimeout(() => {
                  setAddMessage(null)
            }, 3000);
            
            
      }

      const handleDeletePerson = (person)=>{
            const {name, id} = person
            const confirmDelete =  window.confirm(`Deseas eliminar al usuario ${name}`)
            if (confirmDelete){
                  personsService
                        .removePerson(id)
                        .then( personDeleted => {
                              setPersons(persons.filter(person => person.id !== personDeleted.id))
                        })                        
            }
      }

      return(
            <>
                  <h2>PhoneBook</h2>
                  <Notification message={addMessage}/>     
                  <Filter 
                        search={search} 
                        handleSearch={handleSearch}
                  />

                  <h2>add a new </h2>
                  <Form 
                        addPerson={addPerson}
                        newName={newName}
                        newNumber={newNumber}
                        handleNewName={handleNewName}
                        handleNewNumber={handleNewNumber}
                  />
                 
                  <h2>Numbers</h2>
                  <Display 
                        persons={displayFiltered ? filtered : persons}
                        handleDeletePerson={handleDeletePerson}
                        />
            </>
      )

}

export default App
