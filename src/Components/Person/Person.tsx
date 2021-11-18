import * as S from './styles';

interface PeopleProps {
    person: { PersonFullName: string; PersonId: number; PersonRoleCode: string };
}

const Person: React.FC<PeopleProps> = ({ person }) => {
    return (
        <S.Box>
            <S.Role>{person.PersonRoleCode}</S.Role>
            <S.Name>{person.PersonFullName}</S.Name>
        </S.Box>
    );
};

export default Person;
