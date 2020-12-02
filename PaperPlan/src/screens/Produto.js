import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback, Pressable, TouchableOpacity, Keyboard, BackHandler, Alert } from 'react-native';
import DestaquesDaSemana from '../../assets/images/DestaquesDaSemana.png'
import Pp_logo from '../../assets/images/Pp_logo.png'
import Rinoceronte from '../../assets/images/Rinoceronte.jpg'
import Tsuru from '../../assets/images/Tsuru.jpg'
import Almofada from '../../assets/images/Almofada.jpg'
import Porta_treco from '../../assets/images/Porta_treco.jpg'
import Casinha_mdf from '../../assets/images/Casinha_mdf.jpg'
import Header from '../components/Header'
import Filter from '../components/Filter'
import DropDownPicker from 'react-native-dropdown-picker';
import { ContextIsInPage, ContextQuery, ContextThisProductId } from '../../App'
import { db } from '../services/db'
import { useFocusEffect } from '@react-navigation/native'
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const Produto = ({ navigation, name }) => {

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
                'SELECT * FROM table_product WHERE product_id = ?',
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
    }, [page])

    const EscolheImagem = (product_id) => {
        switch (product_id) {
            case 1:
                return Rinoceronte
            case 2:
                return Almofada
            case 3:
                return Tsuru
            case 4:
                return Porta_treco
            case 5:
                return Casinha_mdf
            default:
                return Pp_logo
        }

    }

    const AdicionarCarrinho = () => {
        Alert.alert(
            'Successo',
            'Produto adicionado ao carrinho com sucesso',
            [
                {
                    text: 'Ok',
                    onPress: () => { setPage(''), navigation.goBack()},
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
                    <Image source={EscolheImagem(productList[0].product_id)} style={{ width: '100%', height: 350, resizeMode: 'contain' }} />
                    <View style={{ width: '92%', height: 275, borderWidth: 0, marginLeft: '4%', paddingTop: '3%' }}>
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
                                        style={{ width: productList[0].product_id == 10 ? 30 : 0, marginLeft: productList[0].product_id == 10 ? 10 : 0 }}/>
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
                                        value='sixth' />
                                    <RadioButton
                                        disabled={(productList[0].product_color7 == null) ? true : false}
                                        color={productList[0].product_color7}
                                        uncheckedColor={productList[0].product_color7}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='seventh' />
                                    <RadioButton
                                        disabled={(productList[0].product_color8 == null) ? true : false}
                                        color={productList[0].product_color8}
                                        uncheckedColor={productList[0].product_color8}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='eighth' />
                                    <RadioButton
                                        disabled={(productList[0].product_color9 == null) ? true : false}
                                        color={productList[0].product_color9}
                                        uncheckedColor={productList[0].product_color9}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='nineth' />
                                    <RadioButton
                                        disabled={(productList[0].product_color10 == null) ? true : false}
                                        color={productList[0].product_color10}
                                        uncheckedColor={productList[0].product_color10}
                                        theme={{ colors: { disabled: 'transparent' } }}
                                        value='tenth' />
                                </View>
                            </RadioButton.Group>
                        </View>
                        <View style={{ height: 60, borderBottomWidth: 1.5, borderColor: '#D1D1D1', alignItems: 'center', flexDirection: 'row' }}>
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
                                    marginRight: '5%',
                                    backgroundColor: sizeButtonValue === 'first' ? productList[0].product_id == 10 ? '#9f43bf' : '#E9C4FF' : '#fff'
                                }}>
                                <Text style={{ fontSize: 16, color: productList[0].product_id == 10 ? '#fff' : '#000' }}> {productList[0].product_size1} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={(productList[0].product_size2 != null) ? false : true}
                                onPress={() => setSizeButtonValue('second')}
                                style={{
                                    width: '7.5%',
                                    height: 27.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: '5%',
                                    backgroundColor: sizeButtonValue === 'second' ? '#E9C4FF' : '#fff'
                                }}>
                                <Text style={{ fontSize: 16 }}> {productList[0].product_size2} </Text>
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
                        <View style={{ height: 60, alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '38%' }}>
                                <Text style={{ fontSize: 17.5, color: '#6E6E6E' }}> Quantidade </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setQuantity(Anterior => (Anterior == 0) ? Anterior : Anterior - 1)}>
                                    <Icon name='minus' size={20} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, marginHorizontal: 5 }}> {quantity} </Text>
                                <TouchableOpacity onPress={() => setQuantity(Anterior => Anterior + 1)}>
                                    <Icon name='plus' size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => AdicionarCarrinho()}>
                        <LinearGradient
                            style={{ width: '100%', height: 45, marginTop: 17.1, justifyContent: 'center', alignItems: 'center' }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#C56CE4', '#803F96']}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 18,
                                fontWeight: "500"
                            }}> ADICIONAR AO CARRINHO </Text>
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

export default Produto;