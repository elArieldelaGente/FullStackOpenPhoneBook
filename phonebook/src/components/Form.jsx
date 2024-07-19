/* eslint-disable react/prop-types */
const Form = ({newName, newNumber, handleNewName, handleNewNumber, addPerson}) =>{

      return(
            <>
                  <form onSubmit={addPerson}>
                        <div>
                              name: 
                              <input 
                                    value={newName}
                                    onChange={handleNewName}
                              />
                              <br />
                              phone:
                              <input 
                                    value={newNumber}
                                    onChange={handleNewNumber}
                              />
                        </div>
                        <div>
                              <button type='submit'>
                                    Add
                              </button>
                        </div>
                  </form>

            </>
      )
}

export default Form