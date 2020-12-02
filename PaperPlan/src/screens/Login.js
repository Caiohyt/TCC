import React, { useState, useContext } from 'react';
import {
    Text, StyleSheet, View, TextInput, Image, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import Pp_logo from '../../assets/images/Pp_logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox'
import { db } from '../services/db';
import { ContextUserName } from '../../App'
import { ContextIdUserLogado } from '../../App'

const Login = ({ navigation }) => {

    const [isSelected, setSelection] = useState(false);
    const [textInvalido, settextInvalido] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [userName, setUserName] = useContext(ContextUserName);
    const [idUserLogado, setIdUserLogado] = useContext(ContextIdUserLogado)

    const changeValue = () => (
        setSelection(!isSelected)
    );

    const Verificar = () => {
        console.log("Vc clicou em um botção!");
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM table_user WHERE user_email=? AND user_password=?",
                [userEmail, userPassword],
                (tx, results) => {
                    if (results.rows.length == 0) {
                        settextInvalido('Email ou senha inválidos');
                    } else {
                        setUserName(results.rows.item(0).user_name);
                        setIdUserLogado(results.rows.item(0).user_id);
                        navigation.navigate('DrawerNavigation');
                    }
                }
            );

        });

    };

    return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Image source={Pp_logo} style={styles.imgPp_logo}></Image>
                    <Text style={styles.txtLogin}>Login</Text>
                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.txtInput}
                            placeholder='Email'
                            multiline={false}
                            onChangeText={(value) => setUserEmail(value)} />
                        <Icon name="user" size={30} color='#a0a0a0' />
                    </View>
                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.txtInput}
                            secureTextEntry={true}
                            placeholder='Senha'
                            multiline={false}
                            onChangeText={(value) => setuserPassword(value)} />
                        <Icon name="lock" size={30} color='#a0a0a0' />
                    </View>
                    <View style={styles.viewCheckBox}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={changeValue} />
                        <Text style={styles.txtConectado}> Mantenha-me conectado </Text>
                    </View>
                    <View style={styles.viewMsgErroLogin}>
                        <Text style={styles.txtMsgErroLogin}> {textInvalido} </Text>
                    </View>
                    <TouchableOpacity onPress={Verificar} activeOpacity={0.5}>
                        <LinearGradient
                            style={styles.btnAcessar}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#C56CE4', '#803F96']}>
                            <Text style={styles.txtAcessar}> ACESSAR </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (navigation.navigate('RecuperarSenha'))} activeOpacity={0.5}>
                        <View style={styles.viewEsqueceu}>
                            <Text style={styles.txtEsqueceu}> Esqueceu sua senha? </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.viewCadastro}>
                        <Text style={styles.txtSemConta}> Não possui uma conta? </Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => (navigation.navigate('Cadastro'))}>
                            <Text style={styles.txtCadastro}> Cadastre-se aqui </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: '100%'
    },
    txtLogin: {
        color: "#121212",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "600",
        marginBottom: '10%'
    },
    imgPp_logo: {
        margin: '15%',
        marginBottom: '17%',
    },
    viewInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: "#707070",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        height: 45,
        marginBottom: "4%",
    },
    txtInput: {
        width: "80%",
        height: "80%",
        padding: 1
    },
    viewCheckBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "30%"
    },
    txtConectado: {
        fontSize: 16
    },
    viewMsgErroLogin: {
        width: "80%",
        marginTop: "4%",

    },
    txtMsgErroLogin: {
        color: "#ff3333"
    },
    btnAcessar: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "2%",
        paddingHorizontal: "29%",
        borderRadius: 5
    },
    txtAcessar: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500"
    },
    viewEsqueceu: {
        marginTop: "3%",
        fontSize: 18
    },
    txtEsqueceu: {
        color: "#7D3D92",
        fontSize: 18
    },
    viewCadastro: {
        marginTop: "6%",
        alignItems: "center",
        justifyContent: "center"
    },
    txtSemConta: {
        fontSize: 18
    },
    txtCadastro: {
        fontSize: 18,
        color: "#803F96"
    }
})

export default Login;