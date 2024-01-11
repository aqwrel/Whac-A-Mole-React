import './styles.scss'
import PropTypes from 'prop-types';

Input.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

function Input({ label, value, onChange, disabled }) {
    return (
        <label className=''>
            <p className='input-label'>{label}</p>
            <input type="text" className='input' value={value} onChange={onChange} disabled={disabled} />
        </label>
    )
}

export default Input
