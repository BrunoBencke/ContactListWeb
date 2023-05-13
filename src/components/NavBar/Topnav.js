import './Topnav.css';
import { IoHome, IoCube, IoReaderOutline, IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from '@mui/material';

const Topnav = () => {

    let navigate  = useNavigate();

    const { signout } = useAuth();

    const home = () => navigate('/home');
    const Ingredientes = () => navigate('/Ingredientes');
    const Receitas = () => navigate('/Receitas');

    return(
        <div className='topnav'>
            <Tooltip title="Página Inicial">
                <button className='button' type="button" onClick={home}>
                    <IoHome className='menuicon'></IoHome>
                </button>
            </Tooltip>
            <Tooltip title="Ingredientes">
                <button className='button' type="button" onClick={Ingredientes}>
                    <IoCube className='menuicon'/>
                </button>
            </Tooltip>
            <Tooltip title="Receitas">
                <button className='button' type="button" onClick={Receitas}>
                    <IoReaderOutline className='menuicon'/>
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