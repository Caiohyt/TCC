import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Keyboard, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { SearchBar } from 'react-native-elements'
import { TextInput } from 'react-native-paper';
import { ContextInputPesquisa } from '../../App'
import { ContextIsInPage } from '../../App'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const Header = () => {

    const [InputText, setInputText] = useContext(ContextInputPesquisa);
    const [page, setPage] = useContext(ContextIsInPage);
    const [borderBottomColor, setBorderBottomColor] = useState('#ddd');

    const navigation = useNavigation();

    const menu = () => (
        Keyboard.dismiss(),
        navigation.openDrawer()
    );

    const backButtonHadler = () => {
        setInputText('')
        setPage('Inicio')
        navigation.goBack()
        return true
    }

    useEffect(() => {
        if ((page === 'Pesquisa') || (page == 'Favoritos')) {
            BackHandler.addEventListener("hardwareBackPress", backButtonHadler);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backButtonHadler);
            };
        }
    }, [backButtonHadler]);

    const goToPesquisa = () => {
        setPage('Pesquisa');
        navigation.navigate('Pesquisa');
    }

    const goToFavoritos = () => {
        setInputText('')
        setPage('Favoritos')
        navigation.navigate('ListaDesejos')
    }

    const goToMeusProdutos = () => {
        setInputText('')
        setPage('MeusProdutos')
        navigation.navigate('MeusProdutos')
    }

    const goToCarrinho = () => {
        setInputText('')
        setPage('Carrinho')
        navigation.navigate('Carrinho')
    }

    return (
        <TouchableWithoutFeedback style={styles.containerbig} onPress={() => setBorderBottomColor('#ddd')}>
            <View style={styles.container}>
                <View style={styles.viewButtonMenu}>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => menu()}>
                        <Icon name='menu' size={20} color={'#5A2A6A'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewSearchBar}>
                    <View
                        style={(page === 'Pesquisa') ? { height: '100%', borderBottomWidth: 2, justifyContent: 'center', borderColor: borderBottomColor } : {}}>
                        <TouchableOpacity onPress={() => goToPesquisa()}>
                            <Icon
                                style={(page === 'Pesquisa') ? { marginTop: 5 } : { marginRight: 15 }}
                                name='search'
                                size={23}
                                color={(page === 'Pesquisa') ? '#A8A8A8' : '#5A2A6A'} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        value={InputText}
                        style={(page === 'Pesquisa') ? styles.searchbar : { width: 0, height: 0 }}
                        placeholder='Pesquisar'
                        disabled={(page === 'Pesquisa') ? false : true}
                        onChangeText={(text) => setInputText(text)}
                        onFocus={() => setBorderBottomColor('#6d39fa')}
                        onBlur={() => setBorderBottomColor('#ddd')}
                        theme={{colors: { text: '#404040'}}} />
                    <View
                        style={(page === 'Pesquisa') ? { width: '13%', height: '100%', justifyContent: 'center', borderBottomWidth: 2, borderColor: borderBottomColor } : { width: 0, height: 0 }}>
                        <TouchableOpacity onPress={() => setInputText('')}>
                            <Icon
                                name='x'
                                style={(page === 'Pesquisa') ? { marginTop: 5 } : {}}
                                size={(page === 'Pesquisa') ? 15 : 0}
                                disabled={(page === 'Pesquisa') ? false : true}
                                color='#A8A8A8' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewIcon}>
                    <TouchableOpacity onPress={() => goToFavoritos()}>
                        <Icon name='heart' size={22} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewIcon}>
                    <TouchableOpacity onPress={() => goToMeusProdutos()}>
                        <Icon name='inbox' size={22} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewIcon}>
                    <TouchableOpacity onPress={() => goToCarrinho()}>
                        <Icon2 name='shoppingcart' size={22} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    containerbig: {
        width: '100%',
        height: 48,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    container: {
        width: '100%',
        height: 48,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1.5,
        borderColor: '#c0c0c0'
    },
    viewButtonMenu: {
        width: '15%',
        height: '100%',
        alignItems: 'center',
        alignItems: 'flex-start',
        paddingLeft: '7%'
    },
    btnMenu: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    viewSearchBar: {
        width: '54%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchbar: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff'
    },
    viewIconX: {
        width: '15%'
    },
    viewIcon: {
        width: '9.5%'
    }
})

export default Header