import * as S from './styles';

interface ListProps {
    role: string;
}

const List: React.FC<ListProps> = ({ children, role }) => (
    <S.Box>
        <h3>
            {role}: {children}
        </h3>
    </S.Box>
);

export default List;
