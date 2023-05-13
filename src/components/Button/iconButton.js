import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const iconButton = styled(Button)(({ theme }) => ({
  color: '#707B7C',
  backgroundColor: '#F5f5f5',
  '&:hover': {
    backgroundColor: '#707B7C',
    color: '#F5f5f5',
  },
}));

export default iconButton;
