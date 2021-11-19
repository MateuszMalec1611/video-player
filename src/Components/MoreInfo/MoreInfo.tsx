import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as S from './styles';

interface MoreInfoProps {
    title: string;
    shortDesc: string | boolean;
    description: string;
}

const MoreInfo: React.FC<MoreInfoProps> = ({ title, shortDesc, description }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <S.GameDescriptionTitle>{title}</S.GameDescriptionTitle>
                <S.GameShortDescription>{shortDesc}...</S.GameShortDescription>
            </AccordionSummary>
            <AccordionDetails>
                <S.GameDescription>{description}</S.GameDescription>
            </AccordionDetails>
        </Accordion>
    );
};

export default MoreInfo;
