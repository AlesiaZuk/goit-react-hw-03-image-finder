import PropTypes from 'prop-types';

import s from './Button.module.css';

function Button({ handelClick }) {
  return (
    <button type="button" onClick={handelClick} className={s.button}>
      Load more...
    </button>
  );
}

Button.propTypes = {
  handelClick: PropTypes.func.isRequired,
};

export default Button;
