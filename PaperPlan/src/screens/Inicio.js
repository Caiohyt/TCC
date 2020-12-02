import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback, Pressable, TouchableOpacity, Keyboard } from 'react-native';
import DestaquesDaSemana from '../../assets/images/DestaquesDaSemana.png'
import Header from '../components/Header'
import Filter from '../components/Filter'
import DropDownPicker from 'react-native-dropdown-picker';
import { ContextIsInPage, ContextQuery } from '../../App'
import { useFocusEffect } from '@react-navigation/native'

const Inicio = ({ navigation }) => {

    const [page, setPage] = useContext(ContextIsInPage)
    const [queryFavoritos, setQueryFavoritos] = useContext(ContextQuery)

    useFocusEffect(() => {
        const whenFocused = () => {
            setPage('Inicio')
            setQueryFavoritos('')
        }
        return whenFocused;
    }, [navigation])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header />
                <ScrollView style={{flex: 1, width: '100%'}}>
                    <View style={{ width: '100%', height: 226 }}>
                        <Image source={DestaquesDaSemana} style={styles.imgDestaque} />
                    </View>
                    <Filter />
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
    imgDestaque: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
})

export default Inicio;