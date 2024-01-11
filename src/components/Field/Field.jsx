import './styles.scss'
import PropTypes from 'prop-types';

Field.propTypes = {
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    isPlayer: PropTypes.bool,
    isOpponent: PropTypes.bool,
}

function Field({ onClick, isActive, isOpponent, isPlayer }) {
    let className = ''
    if(isActive)  {
        className = 'field--active'
    } else if (isOpponent) {
        className = 'field--opponent'
    } else if(isPlayer) {
        className = 'field--player'
    }
    
    return (
        <div 
            className={`field ${className} `}
            onClick={onClick}
        />
    )
}

export default Field
