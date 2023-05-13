import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Back = styled(Button)(({ theme }) => ({
  color: '#707B7C',
  backgroundColor: '#FFFFFF',
  borderColor: '#707B7C',
  '&:hover': {
    backgroundColor: '#E5E7E9',
  },
}));

export default Back;
