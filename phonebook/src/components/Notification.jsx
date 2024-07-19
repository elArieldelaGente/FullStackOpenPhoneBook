/* eslint-disable react/prop-types */
import '../index.css'

const Notification = ({message}) => {

      if (!message){
            return null
      }

      const {text, style} = message
      const classStyle = `notification ${style}`

      return (
            <div className={classStyle} >
                  {text} 
            </div>
      )
}

export default Notification