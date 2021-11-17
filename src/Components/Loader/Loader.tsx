import { CircularProgress } from '@mui/material';
import { Box } from './styled';

interface LoaderProps {
    margin?: string;
}

const Loader: React.FC<LoaderProps> = ({ margin }) => {
    return (
        <Box margin={margin}>
            <CircularProgress />
        </Box>
    );
};

export default Loader;
