import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as S from './styles';

interface MoreInfoProps {
    title: string;
    shortDesc: string | boolean;
    description: string;
    inner?: boolean;
}

const MoreInfo: React.FC<MoreInfoProps> = ({ title, shortDesc, description, inner }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <S.GameDescriptionTitle>{title}</S.GameDescriptionTitle>
                <S.GameShortDescription>{shortDesc}...</S.GameShortDescription>
            </AccordionSummary>
            <AccordionDetails>
                {inner && (
                    <S.GameDescription
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}></S.GameDescription>
                )}
                {!inner && <S.GameDescription>{description}</S.GameDescription>}
            </AccordionDetails>
        </Accordion>
    );
};

export default MoreInfo;
