import './Topnav.css';
import { IoHome, IoPerson, IoReaderOutline, IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from '@mui/material';

const Topnav = () => {

    let navigate  = useNavigate();

    const { signout } = useAuth();

    const home = () => navigate('/home');
    const person = () => navigate('/person');

    return(
        <div className='topnav'>
            <Tooltip title="Página Inicial">
                <button className='button' type="button" onClick={home}>
                    <IoHome className='menuicon'></IoHome>
                </button>
            </Tooltip>
            <Tooltip title="Pessoas">
                <button className='button' type="button" onClick={person}>
                    <IoPerson className='menuicon'/>
                </button>
            </Tooltip>
            <Tooltip title="Sair">
                <button className='button' type="button" onClick={signout}>
                    <IoExit className='menuicon'/>
                </button>
            </Tooltip>
        </div>
    )
}

export default Topnav;