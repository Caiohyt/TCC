import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback, Pressable, TouchableOpacity, Keyboard, BackHandler, Alert } from 'react-native';
import DestaquesDaSemana from '../../assets/images/DestaquesDaSemana.png'
import Pp_logo from '../../assets/images/Pp_logo.png'
import Borboleta from '../../assets/images/BorboletaAzul.jpg'
import Tsuru from '../../assets/images/Tsuru.jpg'
import Almofada from '../../assets/images/Almofada.jpg'
import Porta_treco from '../../assets/images/Porta_treco.jpg'
import Casinha_mdf from '../../assets/images/Casinha_mdf.jpg'
import AddImagem from '../../assets/images/AddImagem2.jpg'
import Borboletinha from '../../assets/images/Borboletinha.png'
import Header from '../components/Header'
import Filter from '../components/Filter'
import DropDownPicker from 'react-native-dropdown-picker';
import { ContextIsInPage, ContextQuery, ContextThisProductId } from '../../App'
import { db } from '../services/db'
import { useFocusEffect } from '@react-navigation/native'
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const AlterarProduto = ({ navigation, name }) => {

    console.log()

    const [page, setPage] = useContext(ContextIsInPage)
    const [queryFavoritos, setQueryFavoritos] = useContext(ContextQuery)
    const [thisProductId, setThisProductId] = useContext(ContextThisProductId);
    const [colorButtonValue, setColorButtonValue] = useState('first')
    const [sizeButtonValue, setSizeButtonValue] = useState('first')
    const [quantity, setQuantity] = useState(1)

    const [productList, setProductList] = useState([{ product_name: '' }])

    const backButtonHadler = () => {
        setPage('')
        navigation.goBack()
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHadler);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHadler);
        };

    }, [backButtonHadler]);

    useFocusEffect(() => {
        const whenFocused = () => {
            setPage('Produto')
            setQueryFavoritos('')
        }
        return whenFocused;
    }, [navigation])

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_productupdate WHERE product_id = ?',
                [thisProductId],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));

                    if (productList[0].product_id != temp[0].product_id) {
                        setProductList(temp)
                        setQuantity(1)
                        setColorButtonValue('first')
                        setSizeButtonValue('first')
                    }
                    console.log('Temppppppp', temp)
                }
            );
        });
    }, [page, thisProductId])

    const EscolheImagem = (product_id) => {
        switch (product_id) {
            case 1:
                return Borboleta
            case 2:
                return Almofada
            case 3:
                return Tsuru
            case 4:
                return Porta_treco
            case 5:
                return Casinha_mdf
            case 6:
                return Borboletinha
            case 7:
                return Borboletinha
            case 8:
                return Borboleta
            case 10:
                return AddImagem
            default:
                return AddImagem
        }

    }

    const botaoInv = () => {
        switch (thisProductId) {
            case 10:
                setThisProductId(6)
                break
            case 7:
                setThisProductId(8)
        }
    }

    const Add = () => {
        if (thisProductId == 6) {
            Alert.alert(
                'Sucesso',
                'Item adicionado com sucesso',
                [
                    {
                        text: 'Ok',
                        onPress: () => { setThisProductId(7), setPage(''), navigation.goBack() },
                    },
                ],
                { cancelable: false }
            );
        } else if (thisProductId == 7) {
            Alert.alert(
                'Sucesso',
                'Item alterado com sucesso',
                [
                    {
                        text: 'Ok',
                        onPress: () => { setThisProductId(8), setPage(''), navigation.goBack() },
                    },
                ],
                { cancelable: false }
            );
        } else if (thisProductId == 8) {
            Alert.alert(
                'Sucesso',
                'Item alterado com sucesso',
                [
                    {
                        text: 'Ok',
                        onPress: () => { setThisProductId(8), setPage(''), navigation.goBack() },
                    },
                ],
                { cancelable: false }
            );
        }

    }

    const DeleteItem = () => {
        Alert.alert(
            'Sucesso',
            'Item deletado com sucesso',
            [
                {
                    text: 'Ok',
                    onPress: () => { setThisProductId(-1), setPage(''), navigation.goBack() },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header />
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <TouchableWithoutFeedback onPress={() => botaoInv()}>
                        <Image source={EscolheImagem(productList[0].product_id)} style={{ width: '100%', height: 350, resizeMode: 'contain' }} />
                    </TouchableWithoutFeedback>
                    <View style={{ width: '92%', height: 340, borderWidth: 0, marginLeft: '4%', paddingTop: '3%' }}>
                        <View>
                            <Text style={{ fontSize: 25 }}> {productList[0].product_name} </Text>
                        </View>
                        <View style={{ height: 55, justifyContent: 'center', marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, color: '#6E6E6E' }}> R$ {productList[0].product_price} </Text>
                        </View>
                        <View style={{ height: 60, borderTopWidth: 1.5, borderBottomWidth: 1.5, borderColor: '#D1D1D1', justifyContent: 'center' }}>
                            <RadioButton.Group
                                onValueChange={newValue => setColorButtonValue(newValue)}
                                value={colorButtonValue}>
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon1
                                        name='plus-circle'
                                        color='#9f43bf'
                                        size={23}
                                        style={{ width: productList[0].product_id == 10 ? 30 : 0, marginLeft: productList[0].product_id == 10 ? 10 : 0 }} />
                                    <Text style={{ color: '#6E6E6E', fontSize: 15 }}> {productList[0].product_id == 10 ? 'Adicionar opções de cores' : ''} </Text>
                                    <RadioButton
                                        disabled={(productList[0].product_color1 == null) ? true : false}
                                        color={productList[0].product_color1}
                                        uncheckedColor={productList[0].product_color1}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='first' />
                                    <RadioButton
                                        disabled={(productList[0].product_color2 == null) ? true : false}
                                        color={productList[0].product_color2}
                                        uncheckedColor={productList[0].product_color2}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='second' />
                                    <RadioButton
                                        disabled={(productList[0].product_color3 == null) ? true : false}
                                        color={productList[0].product_color3}
                                        uncheckedColor={productList[0].product_color3}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='third' />
                                    <Icon1
                                        name='plus-circle'
                                        color='#9f43bf'
                                        size={23}
                                        style={{ width: productList[0].product_id == 7 ? 30 : 0, marginLeft: productList[0].product_id == 7 ? 5 : 0 }} />
                                    <RadioButton
                                        disabled={(productList[0].product_color4 == null) ? true : false}
                                        color={productList[0].product_color4}
                                        uncheckedColor={productList[0].product_color4}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='forth' />
                                    <RadioButton
                                        disabled={(productList[0].product_color5 == null) ? true : false}
                                        color={productList[0].product_color5}
                                        uncheckedColor={productList[0].product_color5}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='fifth' />
                                    <RadioButton
                                        disabled={(productList[0].product_color6 == null) ? true : false}
                                        color={productList[0].product_color6}
                                        uncheckedColor={productList[0].product_color6}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='fifth' />
                                    <Icon1
                                        name='plus-circle'
                                        color='#9f43bf'
                                        size={23}
                                        style={{ width: productList[0].product_id == 8 ? 30 : 0, marginLeft: productList[0].product_id == 8 ? 5 : 0 }} />
                                    <RadioButton
                                        disabled={(productList[0].product_color7 == null) ? true : false}
                                        color={productList[0].product_color7}
                                        uncheckedColor={productList[0].product_color7}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='fifth' />
                                    <RadioButton
                                        disabled={(productList[0].product_color8 == null) ? true : false}
                                        color={productList[0].product_color8}
                                        uncheckedColor={productList[0].product_color8}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='fifth' />
                                    <RadioButton
                                        disabled={(productList[0].product_color9 == null) ? true : false}
                                        color={productList[0].product_color9}
                                        uncheckedColor={productList[0].product_color9}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='fifth' />
                                    <RadioButton
                                        disabled={(productList[0].product_color10 == null) ? true : false}
                                        color={productList[0].product_color10}
                                        uncheckedColor={productList[0].product_color10}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='fifth' />
                                </View>
                            </RadioButton.Group>
                        </View>
                        <View style={{ height: 60, alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '38%' }}>
                                <Text style={{ fontSize: 17.5, color: '#6E6E6E' }}> Tamanho(cm) </Text>
                            </View>
                            <TouchableOpacity
                                disabled={(productList[0].product_size1 != null) ? false : true}
                                onPress={() => setSizeButtonValue('first')}
                                style={{
                                    width: '7.5%',
                                    height: 27.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: productList[0].product_id == 10 ? '2%' : '5%',
                                    backgroundColor: sizeButtonValue === 'first' ? productList[0].product_id == 10 ? '#9f43bf' : '#E9C4FF' : '#fff',
                                    borderRadius: productList[0].product_id == 10 ? 5 : 0
                                }}>
                                <Text style={{ fontSize: productList[0].product_id == 10 ? 25 : 16, color: productList[0].product_id == 10 ? '#fff' : '#000' }}> {productList[0].product_size1 == null ? '+' : productList[0].product_size1} </Text>
                            </TouchableOpacity>
                            <Text style={{ color: '#6E6E6E', fontSize: 13.5, width: productList[0].product_id == 10 ? '100%' : 0 }}> {productList[0].product_id == 10 ? 'Adicionar opções de tamanho' : ''} </Text>
                            <TouchableOpacity
                                disabled={(productList[0].product_size2 != null) ? false : true}
                                onPress={() => setSizeButtonValue('second')}
                                style={{
                                    width: '7.5%',
                                    height: 27.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: '5%',
                                    backgroundColor: productList[0].product_id == 7 ? '#9f43bf' : '#fff',
                                    borderRadius: productList[0].product_id == 7 ? 5 : 0
                                }}>
                                <Text style={{ fontSize: productList[0].product_id == 7 ? 25 : 16, color: productList[0].product_id == 7 ? '#fff' : '#000' }}> {productList[0].product_id == 7 ? '+' : productList[0].product_size2} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={(productList[0].product_size3 != null) ? false : true}
                                onPress={() => setSizeButtonValue('third')}
                                style={{
                                    width: '7.5%',
                                    height: 27.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: '5%',
                                    backgroundColor: sizeButtonValue === 'third' ? '#E9C4FF' : '#fff'
                                }}>
                                <Text style={{ fontSize: 16 }}> {productList[0].product_size3} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={(productList[0].product_size4 != null) ? false : true}
                                onPress={() => setSizeButtonValue('forth')}
                                style={{
                                    width: '7.5%',
                                    height: 27.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: '5%',
                                    backgroundColor: sizeButtonValue === 'forth' ? '#E9C4FF' : '#fff'
                                }}>
                                <Text style={{ fontSize: 16 }}> {productList[0].product_size4} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={(productList[0].product_size5 != null) ? false : true}
                                onPress={() => setSizeButtonValue('fifth')}
                                style={{
                                    width: '7.5%',
                                    height: 27.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: '5%',
                                    backgroundColor: sizeButtonValue === 'fifth' ? '#E9C4FF' : '#fff'
                                }}>
                                <Text style={{ fontSize: 16 }}> {productList[0].product_size5} </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 60, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1.8, borderTopWidth: 1.5, borderColor: '#D1D1D1', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                                <Icon color='#7E3E93' name='keyboard-arrow-down' size={25} />
                                <Text style={{ fontSize: 18, color: '#6E6E6E' }}> {productList[0].product_category} </Text>
                            </View>
                        </View>
                        <View style={{ height: 60, alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                                <Icon color='#7E3E93' name='keyboard-arrow-down' size={25} />
                                <Text style={{ fontSize: 18, color: '#6E6E6E' }}> {productList[0].product_material} </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => Add()} activeOpacity={0.5}>
                        <LinearGradient
                            style={{ width: '100%', height: 45, marginTop: 17.1, justifyContent: 'center', alignItems: 'center' }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#C56CE4', '#803F96']}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 18,
                                fontWeight: "500"
                            }}> {(productList[0].product_id == 8 || productList[0].product_id == 7) ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR'} </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => DeleteItem()}>
                        <LinearGradient
                            style={{ width: '100%', height: 45, justifyContent: 'center', alignItems: 'center' }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#F22121', '#F22121']}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 18,
                                fontWeight: "500"
                            }}> EXCLUIR </Text>
                        </LinearGradient>
                    </TouchableOpacity>
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

export default AlterarProduto;