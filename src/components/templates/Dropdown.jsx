import PropTypes from 'prop-types'
const Dropdown = ({title,options,func}) => {
  return (
    <div className='select'>
          <select defaultValue='0' name="format" id="format" onChange={func}>
            <option value="0" disabled>
              {title}
            </option>
            {options && options.map((o,i)=>(
                <option key={i} value={o} >{o.toUpperCase()}</option>
            ))}
          </select>
        </div>
  )
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  func: PropTypes.func.isRequired
}

export default Dropdown