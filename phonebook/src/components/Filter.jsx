/* eslint-disable react/prop-types */
const Filter = ({search, handleSearch}) => {
      return(
            <>
                  <h3>filter show with:</h3>
                  <input 
                        value={search}
                        onChange={handleSearch}
                  />
            </>
      )
}

export default Filter