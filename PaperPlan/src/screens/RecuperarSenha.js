import React, { useState } from 'react';
import {
    Text, StyleSheet, View, TextInput, Image, Button, Pressable, TouchableOpacity,
    TouchableWithoutFeedback, Keyboard
} from 'react-native';
import Pp_logo from '../../assets/images/Pp_logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox'

const RecuperarSenha = ({ navigation }) => {

    const Enviar = () => (
        console.log("Vc clicou em um botção!")
    );

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Image source={Pp_logo} style={styles.imgPp_logo}></Image>
                <Text style={styles.txtTitulo}> Recuperar Senha</Text>
                <Text style={styles.txtTexto}>
                    Enviaremos um email para redefinir sua senha
            </Text>
                <View style={styles.viewInput}>
                    <TextInput
                        style={styles.txtInput}
                        placeholder='Email'
                        multiline={false} />
                    <Icon name="user" size={30} color='#a0a0a0' />
                </View>
                <TouchableOpacity onPress={Enviar}>
                    <LinearGradient
                        style={styles.btnEnviar}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#C56CE4', '#803F96']}>
                        <Text style={styles.txtEnviar}> Enviar </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.viewCadastro}>
                    <Text style={styles.txtSemConta}> Não possui uma conta? </Text>
                    <TouchableOpacity onPress={() => (navigation.navigate('Cadastro'))}>
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
        height: '100%',
        backgroundColor: '#FFF'
    },
    imgPp_logo: {
        margin: '18%',
        marginBottom: '15%',
    },
    txtTitulo: {
        color: "#121212",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "600",
        marginBottom: '13%'
    },
    txtTexto: {
        color: "#121212",
        fontSize: 20,
        textAlign: "left",
        letterSpacing: 0,
        width: '80%'
    },
    viewInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: "#707070",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        height: "6%",
        marginBottom: "4%",
        marginTop: '9%'
    },
    txtInput: {
        width: "80%",
        height: "80%",
        padding: 1
    },
    btnEnviar: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "2%",
        paddingHorizontal: "33%",
        borderRadius: 5,
        marginTop: '5%'
    },
    txtEnviar: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500"
    },
    viewCadastro: {
        marginTop: "16%",
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

export default RecuperarSenha