import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Accept = styled(Button)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: '#1A3D4D',
  '&:hover': {
    backgroundColor: '#5671BB',
    color: '#FFFFFF',
  },
}));

export default Accept;
