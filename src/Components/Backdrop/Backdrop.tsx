import BackdropComponent from '@mui/material/Backdrop';

interface BackdropProps {
    open: boolean;
    click: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ children, open, click }) => {
    return (
        <BackdropComponent
            sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={click}>
            {children}
        </BackdropComponent>
    );
};

export default Backdrop;
