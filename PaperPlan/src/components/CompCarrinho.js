import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Keyboard, FlatList, ImageBackground, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Octicons'
import { db } from '../services/db'
import Pp_logo from '../../assets/images/Pp_logo.png'
import Rinoceronte from '../../assets/images/Rinoceronte.jpg'
import Tsuru from '../../assets/images/Tsuru.jpg'
import Almofada from '../../assets/images/Almofada.jpg'
import Porta_treco from '../../assets/images/Porta_treco.jpg'
import Casinha_mdf from '../../assets/images/Casinha_mdf.jpg'
import Stars_icon from '../../assets/images/Stars_icon.png'
import { ContextIdUserLogado, ContextInputPesquisa, ContextIsInPage, ContextItensEncontrados, ContextQuery, ContextThisProductId } from '../../App'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const CompCarrinho = () => {

    const [filter, setFilter] = useState('maisVendidos');
    const [filterHeight, setFilterHeight] = useState('10%');
    const [isGrid, setGrid] = useState(false);
    const [filterValue, setFilterValue] = useState('product_views DESC')
    const [idUserLogado, setIdUserLogado] = useContext(ContextIdUserLogado)
    const [inputText, setInputText] = useContext(ContextInputPesquisa)
    const [page, setPage] = useContext(ContextIsInPage)
    const [queryFavoritos, setQueryFavoritos] = useContext(ContextQuery)
    const [queryPage, setQueryPage] = useState('')
    const [itensEncontrados, setItensEncontrados] = useContext(ContextItensEncontrados);
    const [thisProductId, setThisProductId] = useContext(ContextThisProductId);
    const [origamiQuantity, setOrigamiQuantity] = useState(7);
    const [almofadaQuantity, setAlmofadaQuantity] = useState(3);
    const [frete, setFrete] = useState(0);

    const navigation = useNavigation();

    const viewFilter = (filterHeight) => {
        return {
            width: '44%',
            height: filterHeight,
            position: 'absolute',
            marginLeft: '6%',
            zIndex: 3,
            marginTop: '1%'
        }
    };

    console.log('PG Pls', page)

    const [flatListItems, setFlatListItems] = useState([]);
    const [flatListItemsFavoritos, setFlatListItemsFavoritos] = useState([]);
    const [produtosFavoritados, setProdutosFavoritados] = useState([])

    useEffect(() => {
        // db.transaction((tx) => {
        //     tx.executeSql(
        //         'DELETE FROM table_product WHERE product_id IN (?)',
        //         ['6']
        //     );
        // });
        // db.transaction((tx) => {
        //     tx.executeSql(
        //         'INSERT INTO table_product(product_name, product_price, product_views) VALUES (?,?,?)',
        //         ['LUL', '100,00', 8000]
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_product (product_name, product_price, product_color1, product_color2, product_color3, product_color4, product_color5, product_size1, product_size2, product_size3, product_size4, product_size5, product_category, product_material, product_views) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //         ['Thiago', '152,00', '#00fff0', '#00ff00', '#000', '#ff0000', '#2583EF', 5, 10, 15, 20, 30, 'Xandão', 'Aço', 1000000],
        //     );
        // })
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_product WHERE product_id IN (?,?)',
                [1, 2],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setFlatListItems(temp);
                    console.log(flatListItems)
                }
            );
        })

    }, []);

    const viewItem = (product_id) => {
        return {
            width: ((product_id == 1 && origamiQuantity == 0) || (product_id == 2 && almofadaQuantity == 0)) ? '0%' : '100%',
            height: ((product_id == 1 && origamiQuantity == 0) || (product_id == 2 && almofadaQuantity == 0)) ? 0 : 140,
            backgroundColor: '#FFF',
            padding: 10,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };

    const VerificarFavorito = (id_produto) => {
        if (produtosFavoritados.indexOf(id_produto) > -1) {
            return true
        } else {
            return false
        }
    }

    const goToProduto = (item) => {
        setThisProductId(item.product_id)
        setPage('Produto')
        navigation.navigate('Produto')
    }

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

    const minusAllQuantity = (product_id) => {
        switch (product_id) {
            case 1:
                setOrigamiQuantity(Anterior => (Anterior == 0) ? Anterior : Anterior - 1)
                break
            case 2:
                setAlmofadaQuantity(Anterior => (Anterior == 0) ? Anterior : Anterior - 1)
                break
        }
    }

    const plusAllQuantity = (product_id) => {
        switch (product_id) {
            case 1:
                setOrigamiQuantity(Anterior => Anterior + 1)
                break
            case 2:
                setAlmofadaQuantity(Anterior => Anterior + 1)
                break
        }
    }

    const AllQuantity = (product_id) => {
        switch (product_id) {
            case 1:
                return origamiQuantity
            case 2:
                return almofadaQuantity
        }
    }

    const deleteItem = (product_id) => {
        switch (product_id) {
            case 1:
                setOrigamiQuantity(0)
                break
            case 2:
                setAlmofadaQuantity(0)
                break
        }
    }


    let listItemView = (item) => {
        return (
            <View key={item.product_id} style={viewItem(item.product_id)} >
                <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => goToProduto(item)}>
                    <View style={{ width: '90%', height: '100%', flexDirection: isGrid ? 'column' : 'row' }}>
                        <View style={{ width: isGrid ? '100%' : '30%', height: isGrid ? '65%' : '100%' }}>
                            <ImageBackground
                                source={EscolheImagem(item.product_id)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end'
                                }}
                                imageStyle={{ resizeMode: 'contain' }} >
                            </ImageBackground>
                        </View>
                        <View style={{ width: isGrid ? '100%' : '70%', height: '100%', flexDirection: 'column', paddingLeft: 20 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <View style={{ width: '85%' }}>
                                    <Text style={{ fontSize: 18 }}>{item.product_name}</Text>
                                </View>
                                <View style={{ width: '15%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => { deleteItem(item.product_id) }}
                                        disabled={isGrid ? true : false}>
                                        <Icon1
                                            name='x'
                                            color='#D4D4D4'
                                            size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Image source={Stars_icon} style={{ width: isGrid ? '55%' : '40%', resizeMode: 'stretch' }} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 20 }}>R$ {item.product_price}</Text>
                            </View>
                            <View style={{ height: 50, alignItems: 'center', flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => minusAllQuantity(item.product_id)}>
                                        <Icon name='minus-circle' size={20} color='#7D3D92' />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 18, marginHorizontal: 5, }}> {AllQuantity(item.product_id)} </Text>
                                    <TouchableOpacity onPress={() => plusAllQuantity(item.product_id)}>
                                        <Icon name='plus-circle' size={20} color='#7D3D92' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_product WHERE product_id IN (?,?)',
                [1, 2],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setFlatListItems(temp);
                    console.log(flatListItems)
                }
            );
        })
        console.log('PAGINAAAAAAAAAA', page)
    }, [filterValue, inputText, page]);

    const calculaSubtotal = () => {
        return (origamiQuantity * 1.35 + almofadaQuantity * 25.00)
    }

    const goToInicio  = () => {
        setPage('Inicio')
        navigation.navigate('Início')
    }

    const finalizarCompra = () => {
        Alert.alert(
            'Sucesso',
            'Compra finalizada com sucesso',
            [
                {
                    text: 'Ok',
                    onPress: () => goToInicio(),
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.flatlistContainer}>
                    <FlatList
                        key={isGrid ? 'h' : 'v'}
                        horizontal={false}
                        numColumns={isGrid ? 2 : 1}
                        data={flatListItems}
                        ItemSeparatorComponent={isGrid ? null : null}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                        extraData={flatListItems}
                        style={{ width: '100%', marginHorizontal: isGrid ? '5%' : 0 }}
                    />
                </View>
            </View>
            <View style={styles.viewPagamento}>
                <View style={{ width: '100%', height: 35, justifyContent: 'center', paddingLeft: 30 }}>
                    <Text style={styles.txtPagamento}>SUBTOTAL              R$ {calculaSubtotal()}  </Text>
                </View>
                <View style={{ width: '100%', height: 35, justifyContent: 'center', paddingLeft: 30 }}>
                    <Text style={styles.txtPagamento}>FRETE                     R$ {frete}</Text>
                </View>
                <View style={{ borderWidth: 1, width: '80%', height: 40, borderColor: '#707070', flexDirection: 'row' }}>
                    <TextInput keyboardType='numeric' style={{ width: '85%' }} maxLength={8} placeholder='DIGITE SEU CEP' />
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => setFrete(Math.round((Math.random() * 5) * 100) / 100)}>
                        <Text style={{ fontSize: 17 }}>OK</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 35, justifyContent: 'center', paddingLeft: 30 }}>
                    <Text style={styles.txtPagamento}>TOTAL                     R$ {calculaSubtotal() + frete}</Text>
                </View>
                <TouchableOpacity style={{ width: '100%' }} onPress={() => finalizarCompra()} activeOpacity={0.5}>
                    <LinearGradient
                        style={{ width: '100%', height: 45, marginTop: 17.1, justifyContent: 'center', alignItems: 'center' }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#C56CE4', '#803F96']}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: "500"
                        }}> FINALIZAR COMPRA </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    contentContainer: {
        width: '100%',
        height: 435,
        alignItems: 'center',
        padding: 0,
        margin: 0
    },
    flatlistContainer: {
        width: '100%',
        height: '100%',
        margin: 0
    },
    viewPagamento: {
        width: '100%',
        height: 206,
        alignItems: 'center'
    },
    txtPagamento: {
        fontSize: 17
    }
})

export default CompCarrinho