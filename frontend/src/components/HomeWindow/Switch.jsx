
import PropTypes from 'prop-types';
const Switch=({searchkey})=>{
    return(<> {searchkey? (<> {searchkey} </>) : (<> Welcome</>) } </>)
}

Switch.propTypes = {
    // Define prop types here
    searchkey: PropTypes.string.isRequired,
}
export default Switch