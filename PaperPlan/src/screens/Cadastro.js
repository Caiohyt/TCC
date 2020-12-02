import React, { useState } from 'react';
import {
    Text, StyleSheet, View, TextInput, Image, Alert, TouchableOpacity,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView
} from 'react-native';
import Pp_logo from '../../assets/images/Pp_logo.png'
import Voltar_icon from '../../assets/images/Voltar_icon.png'
import LinearGradient from 'react-native-linear-gradient'
import { db } from '../services/db'


const Cadastro = ({ navigation }) => {

    const [textInvalido, settextInvalido] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [userConfirmPassword, setuserConfirmPassword] = useState('');

    const register_user = () => {

        settextInvalido('');

        if (!userName) {
            settextInvalido('Preencha o campo "Nome Completo"');
            return;
        }
        if (!userEmail) {
            settextInvalido('Preencha o campo "Email"');
            return;
        }
        if (!userPassword) {
            settextInvalido('Preencha o campo "Senha"');
            return;
        }
        if (userPassword != userConfirmPassword) {
            settextInvalido('As senhas não conferem');
            return;
        }
        console.log(db);

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_user (user_name, user_email, user_password) VALUES (?,?,?)',
                [userName, userEmail, userPassword],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log(userName, userEmail, userPassword);
                        Alert.alert(
                            'Successo',
                            'Conta cadastrada com sucesso',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Login'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Registration Failed');
                }
            );
        });
    };

    const setInfo = () => {
        setUserName('Elma Maria')
        setuserEmail('admin@admin.com')
        setuserPassword('sa')
        setuserConfirmPassword('sa')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => setInfo()}>
                    <Image source={Pp_logo} style={styles.imgPp_logo}></Image>
                </TouchableWithoutFeedback>
                <View style={styles.viewTitulo}>
                    <TouchableOpacity style={styles.btnVoltar} onPress={() => (navigation.goBack())}>
                        <Image source={Voltar_icon} />
                    </TouchableOpacity>
                    <Text style={styles.txtTitulo}> Cadastro </Text>
                </View>
                <TextInput
                    value={userName}
                    style={styles.txtInput}
                    placeholder='Nome Completo'
                    multiline={false}
                    onChangeText={(value) => setUserName(value)} />
                <TextInput
                    value={userEmail}
                    style={styles.txtInput}
                    placeholder='Email'
                    multiline={false}
                    onChangeText={(value) => setuserEmail(value)} />
                <TextInput
                    value={userPassword}
                    style={styles.txtInput}
                    secureTextEntry={true}
                    placeholder='Senha'
                    multiline={false}
                    onChangeText={(value) => setuserPassword(value)} />
                <TextInput
                    value={userConfirmPassword}
                    style={styles.txtInput}
                    secureTextEntry={true}
                    placeholder='Consfirmar Senha'
                    multiline={false}
                    onChangeText={(value) => setuserConfirmPassword(value)} />
                <View style={styles.viewMsgErroLogin}>
                    <Text style={styles.txtMsgErroLogin}> {textInvalido} </Text>
                </View>
                <TouchableOpacity onPress={register_user} activeOpacity={0.5}>
                    <LinearGradient
                        style={styles.btnAcessar}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#C56CE4', '#803F96']}>
                        <Text style={styles.txtAcessar}> CADASTRAR </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.viewCadastro}>
                    <Text style={styles.txtSemConta}> Já possui uma conta? </Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => (navigation.navigate('Login'))}>
                        <Text style={styles.txtCadastro}> Acesse aqui </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#FFF'
    },
    txtTitulo: {
        color: "#121212",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "600",
        marginBottom: '10%',
        marginHorizontal: "24%"
    },
    imgPp_logo: {
        margin: '15%',
        marginBottom: '12%',
    },
    viewTitulo: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center"
    },
    btnVoltar: {
        paddingTop: "2%"
    },
    txtInput: {
        width: "80%",
        height: 40,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 25,
        borderColor: "#707070",
        alignItems: "center",
        marginBottom: "4%",
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
        paddingHorizontal: "25%",
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

export default Cadastro;