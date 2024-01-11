import './styles.scss'
import PropTypes from 'prop-types';

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

function Button({ label, onClick, disabled }) {
    return (
        <button className='button' onClick={onClick} disabled={disabled}>{label}</button>
    )
}

export default Button
