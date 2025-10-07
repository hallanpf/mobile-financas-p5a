import { Icon } from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, ButtonMenu } from '../../pages/SignIn/styles'


export default function Header({ title }){
    const navigation = useNavigation();

    return(
        <Container>
            <ButtonMenu>

            </ButtonMenu>

            { title && (
                <Title>
                    {title}
                </Title>
            )}
        </Container>
    )
}