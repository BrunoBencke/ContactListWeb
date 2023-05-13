import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Accept = styled(Button)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: '#99A3A4',
  '&:hover': {
    backgroundColor: '#707B7C',
    color: '#FFFFFF',
  },
}));

export default Accept;
