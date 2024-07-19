/* eslint-disable react/prop-types */

const label = 'delete person'

const Person = ( {person, handleDeletePerson} )=>{
      return(
            <>
               <li >
                   {person.name} {person.number} 
                   <button onClick={()=>handleDeletePerson(person)}>
                        {label}
                   </button>
               </li> 
            </>
      )
}

export default Person