import * as S from './styles';

interface PeopleProps {
    personFullName: string;
}

const Person: React.FC<PeopleProps> = ({ personFullName }) => {
    return <S.Name> {personFullName}</S.Name>;
};

export default Person;
