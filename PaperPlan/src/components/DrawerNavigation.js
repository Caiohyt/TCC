import React, { useContext, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Inicio from '../screens/Inicio'
import Pesquisa from '../screens/Pesquisa'
import ListaDesejos from '../screens/ListaDesejos'
import Produto from '../screens/Produto'
import Carrinho from '../screens/Carrinho'
import MeusProdutos from '../screens/MeusProdutos'
import AlterarProduto from '../screens/AlterarProduto'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Avatar } from 'react-native-paper';
import Pp_logo from '../../assets/images/Pp_logo.png'
import { ContextUserName } from '../../App'
import Exit_icon from '../../assets/images/Exit_icon.png'
import Help_icon from '../../assets/images/Help_icon.png'
import Config_icon from '../../assets/images/Config_icon.png'
import { ContextIsInPage } from '../../App'
import { ContextInputPesquisa } from '../../App'
import Header from './Header'

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName='Inicio'
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen component={Inicio} name='Início' navigation={{navigation}} />
            <Drawer.Screen component={Pesquisa} name='Pesquisa' navigation={{navigation}} />
            <Drawer.Screen component={ListaDesejos} name='ListaDesejos' navigation={{navigation}} />
            <Drawer.Screen component={Produto} name='Produto' navigation={{navigation}} />
            <Drawer.Screen component={Carrinho} name='Carrinho' navigation={{navigation}} />
            <Drawer.Screen component={MeusProdutos} name='MeusProdutos' navigation={{navigation}} />
            <Drawer.Screen component={AlterarProduto} name='AlterarProduto' navigation={{navigation}} />
        </Drawer.Navigator>
    );
};

export const DrawerContent = ({ navigation }) => {

    const [userName, setUserName] = useContext(ContextUserName);
    const [InputText, setInputText] = useContext(ContextInputPesquisa);
    const [page, setPage] = useContext(ContextIsInPage);

    return (
        <View style={styles.container}>
            <View style={styles.viewUserInfo}>
                <View style={styles.viewImageUser}>
                    <Avatar.Image
                        source={Pp_logo}
                        size={70} />
                </View>
                <View style={styles.viewUserInfoText}>
                    <View style={styles.viewOlaIcon}>
                        <View style={styles.viewTextOla}>
                            <Text style={styles.txtUserInfo}> Olá, </Text>
                        </View>
                        <View style={styles.viewIcon}>
                            <TouchableOpacity onPress={() => (navigation.closeDrawer())}>
                                <Icon name='menu' size={25} color={'#5A2A6A'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.viewUserName}>
                        <Text style={styles.txtUserInfo}> {userName} </Text>
                    </View>
                </View>
            </View>
            <View style={styles.viewNavigationOption}>
                <TouchableOpacity style={styles.btn} onPress={() => {setPage('Inicio'), setInputText(''), navigation.navigate('Início')}}>
                    <View style={styles.viewButton}>
                        <Text style={styles.txtButton}> Início </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <View style={styles.viewButton}>
                        <Text style={styles.txtButton}> Meus Pedidos </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => {setPage('ListaDesejos'), setInputText(''), navigation.navigate('ListaDesejos')}}>
                    <View style={styles.viewButton}>
                        <Text style={styles.txtButton}> Lista de Desejos </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => {setPage('Carrinho'), setInputText(''), navigation.navigate('Carrinho')}}>
                    <View style={styles.viewButton}>
                        <Text style={styles.txtButton}> Meu Carrinho </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <View style={styles.viewButton} onPress={() => {setPage('MeusProdutos'), setInputText(''), navigation.navigate('MeusProdutos')}}>
                        <Text style={styles.txtButton}> Meus Produtos </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <View style={styles.viewButton}>
                        <Text style={styles.txtButton}> Encomendas </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.viewBottom}>
                <TouchableOpacity style={styles.btnBottom}>
                    <View style={styles.viewButtonBottom}>
                        <Image source={Exit_icon} style={styles.imgButton}/>
                        <Text style={styles.txtButtonBottom}> Sair </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBottom}>
                    <View style={styles.viewButtonBottom}>
                        <Image source={Help_icon} style={styles.imgButton}/>
                        <Text style={styles.txtButtonBottom}> Ajuda </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBottom}>
                    <View style={styles.viewButtonBottom}>
                        <Image source={Config_icon} style={styles.imgButton}/>
                        <Text style={styles.txtButtonBottom}> Configurações </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewUserInfo: {
        width: '100%',
        height: '17.5%',
        flexDirection: 'row'
    },
    viewImageUser: {
        width: '35%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewUserInfoText: {
        width: '65%',
        height: '100%',
        flexDirection: 'column'
    },
    viewOlaIcon: {
        width: '100%',
        height: '50%',
        flexDirection: 'row'
    },
    viewTextOla: {
        width: '75%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: '1%'
    },
    viewIcon: {
        width: '25%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: '3%'
    },
    viewUserName: {
        width: '100%',
        height: '50%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: '1%'
    },
    txtUserInfo: {
        color: '#773A8B',
        fontSize: 21
    },
    viewNavigationOption: {
        width: '100%',
        height: '62%'
    },
    btn: {
        width: '100%',
        height: '8%',
        alignItems: 'center'
    },
    viewButton: {
        width: '85%',
        height: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#823F98',
        justifyContent: 'center',
        paddingLeft: '3%',
        paddingTop: '2%'
    },
    txtButton: {
        fontSize: 18,
        color: '#404040'
    },
    viewBottom: {
        width: '100%',
        height: '23%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    btnBottom: {
        width: '100%',
        height: '25%',
        backgroundColor: '#efefef',
        marginTop: '1%'
    },
    viewButtonBottom: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '12%',
        flexDirection: 'row'
    },
    imgButton: {
        width: '9%',
        height: '55%',
        resizeMode: 'stretch'
    },
    txtButtonBottom: {
        fontSize: 20,
        color: '#707070',
        paddingLeft: '2%'
    }
});


export default DrawerNavigation;
