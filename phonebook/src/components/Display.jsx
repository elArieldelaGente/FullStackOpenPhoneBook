/* eslint-disable react/prop-types */
import Persons from "./Persons"

const Display = ( { persons, handleDeletePerson} ) => {
      return(
            <>
                  <ul>
                        <Persons 
                              persons={persons}
                              handleDeletePerson={handleDeletePerson} />
                  </ul>
            </>
      )
}

export default Display
