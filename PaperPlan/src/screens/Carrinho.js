import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback, Pressable, TouchableOpacity, Keyboard } from 'react-native';
import DestaquesDaSemana from '../../assets/images/DestaquesDaSemana.png'
import Header from '../components/Header'
import CompCarrinho from '../components/CompCarrinho'
import DropDownPicker from 'react-native-dropdown-picker';
import { ContextIsInPage, ContextItensEncontrados, ContextQuery } from '../../App'
import { useFocusEffect } from '@react-navigation/native';

const Carrinho = ({ navigation }) => {

    const [itensEncontrados, setItensEncontrados] = useContext(ContextItensEncontrados);
    const [page, setPage] = useContext(ContextIsInPage)
    const [queryFavoritos, setQueryFavoritos] = useContext(ContextQuery)

    useFocusEffect(() => {
        const whenFocused = () => {
            setPage('Carrinho')
            setQueryFavoritos('')
        }
        return whenFocused;
    }, [navigation])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header navigation={true} />
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <Text style={styles.txtItensEncontrados}> Meu Carrinho </Text>
                    <CompCarrinho />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fff'
    },
    txtItensEncontrados: {
        fontSize: 23,
        color: '#773A8B',
        paddingLeft: 30,
        paddingTop: 15
    }
})

export default Carrinho;