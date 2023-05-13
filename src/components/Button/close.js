import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Close = styled(Button)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: '#EC7063',
  '&:hover': {
    backgroundColor: '#E74C3C',
    color: '#FFFFFF',
  },
}));

export default Close;
