
import { Link } from 'react-router-dom';
import './package.css'
const Package = () => {

  return (
    <Link to="/details">
      <div className='container'>
        <img
          src= 'https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg'
          alt="avatar"
          className='img'
        />
        <h5 className= 'desc'>house</h5>
        <p className='desc'>------------------------</p>
        <p className='desc'>
          big size room with 2 beds and 1 bathroom
        </p>
        <p className='links'>
          <span><i className="bx bxl-facebook-circle text-secondary" /></span>
          <span><i className="bx bxl-twitter text-secondary" /></span>
          <span><i className="bx bxl-instagram text-secondary" /></span>
        </p>
      </div>
    </Link>
  );
};


export default Package;