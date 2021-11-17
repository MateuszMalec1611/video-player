import { HamburgerComponent, Lines } from './styles';

interface HamburgerProps {
    notActive: boolean;
    handleMenu?: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ notActive, handleMenu }) => (
    <HamburgerComponent onClick={handleMenu} notActive={notActive}>
        <Lines notActive={notActive} />
    </HamburgerComponent>
);

export default Hamburger;
