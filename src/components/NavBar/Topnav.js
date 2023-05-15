import './Topnav.css';
import {
  MdOutlineHome,
  MdPersonOutline,
  MdOutlineExitToApp,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Tooltip } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  customTooltip: {
    color: '#1A3D4D',
    backgroundColor: '#D1F97B',
    fontSize: '1rem',
    fontWeight: 'normal',
    padding: '8px',
  },
}));

const Topnav = () => {
  let navigate = useNavigate();
  const classes = useStyles();

  const { signout } = useAuth();

  const home = () => navigate('/home');
  const person = () => navigate('/person');

  return (
    <div className="topnav">
      <Tooltip
        title="Página Inicial"
        classes={{ tooltip: classes.customTooltip }}
      >
        <button className="button" type="button" onClick={home}>
          <MdOutlineHome className="menuicon" />
        </button>
      </Tooltip>
      <Tooltip title="Pessoas" classes={{ tooltip: classes.customTooltip }}>
        <button className="button" type="button" onClick={person}>
          <MdPersonOutline className="menuicon" />
        </button>
      </Tooltip>
      <Tooltip title="Sair" classes={{ tooltip: classes.customTooltip }}>
        <button className="button" type="button" onClick={signout}>
          <MdOutlineExitToApp className="menuicon" />
        </button>
      </Tooltip>
    </div>
  );
};

export default Topnav;
