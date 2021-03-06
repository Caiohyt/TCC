import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Keyboard, FlatList, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import { db } from '../services/db'
import Pp_logo from '../../assets/images/Pp_logo.png'
import Borboleta from '../../assets/images/Borboleta.jpg'
import Tsuru from '../../assets/images/Tsuru.jpg'
import Almofada from '../../assets/images/Almofada.jpg'
import Porta_treco from '../../assets/images/Porta_treco.jpg'
import Casinha_mdf from '../../assets/images/Casinha_mdf.jpg'
import UpdatedGrid from '../../assets/images/UpdatedGrid.jpg'
import NotUpdatedGrid from '../../assets/images/NotUpdatedGrid.jpg'
import NotUpdatedList from '../../assets/images/NotUpdatedList.jpg'
import UpdatedList from '../../assets/images/UpdatedList2.jpg'
import Stars_icon from '../../assets/images/Stars_icon.png'
import { ContextIdUserLogado, ContextInputPesquisa, ContextIsInPage, ContextItensEncontrados, ContextQuery, ContextThisProductId } from '../../App'
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';


const CompMeusProdutos = () => {

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
    const [listItem, setListItem] = useState([
        { product_id: 1 }
    ]);
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
        if (page === 'Favoritos')
            setQueryFavoritos('WHERE product_id IN (SELECT product_id FROM table_favoritos) ')
        else
            setQueryFavoritos('')

        if (inputText === '') {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM table_product ' + queryFavoritos + 'ORDER BY product_views DESC, product_name ASC',
                    [],
                    (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));
                        setFlatListItems(temp);
                        console.log(flatListItems)
                    }
                );
            })
        } else {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM table_product WHERE product_name LIKE '" + inputText + "%' ORDER BY product_views DESC, product_name ASC",
                    [],
                    (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));
                        setFlatListItems(temp);
                        console.log(flatListItems)
                    }
                );
            })
        }
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_favoritos WHERE user_id = (?)',
                [idUserLogado],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i).product_id);
                    setProdutosFavoritados(temp);
                    console.log('Conteúdo tabela favoritos', temp)
                }
            );
        });
    }, []);

    useEffect(() => {
        if (thisProductId == -1) {
            setListItem([{product_id: 1}])
        }
        if (thisProductId == 7) {
            setListItem(anterior => [...anterior, { product_id: 7 }])
        }
        if (thisProductId == 8) {
            setListItem(anterior => [...anterior, { product_id: 8 }])
        }
        console.log('Bob', listItem)
    }, [thisProductId])

    const addFavoritos = (product_id) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO table_favoritos (user_id, product_id) VALUES (?,?)',
                [idUserLogado, product_id]
            );
        })
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_favoritos WHERE user_id = (?)',
                [idUserLogado],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i).product_id);
                    setProdutosFavoritados(temp);
                    console.log('Conteúdo tabela favoritos', temp)
                }
            )
        })
        console.log(produtosFavoritados)
    }

    const deleteFavoritos = (product_id) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM table_favoritos WHERE user_id = ? AND product_id = ?',
                [idUserLogado, product_id]
            );
        });
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_favoritos WHERE user_id = (?)',
                [idUserLogado],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i).product_id);
                    setProdutosFavoritados(temp);
                    console.log('Conteúdo tabela favoritos', temp)
                }
            );
        });
        console.log('DELETADO', produtosFavoritados)
    }

    const viewItem = () => {
        return {
            width: isGrid ? '45%' : '100%',
            height: isGrid ? 300 : 140,
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

    const goToProduto = (product_id) => {
        if (thisProductId != 8) {
            setThisProductId(product_id)
        }
        
        setPage('AlterarProduto')
        navigation.navigate('AlterarProduto')
    }

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
            default:
                return Pp_logo
        }

    }

    const getImage = () => {
        switch (thisProductId) {
            case 7:
                return (isGrid ? NotUpdatedGrid : NotUpdatedList)
            case 8:
                return (isGrid ? UpdatedGrid : UpdatedList)
        }
    }

    let listItemView = (item) => {
        <View key={item.product_id} style={viewItem()} >
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => goToProduto(7)}>
                <Image source={getImage()} style={{ width: '100%', height: '100%' }} />
            </TouchableOpacity>
        </View>
    }


    let listItemView0 = (item) => {
        if (item.product_id == 1) {
            return (
                <View key={item.product_id} style={viewItem()} >
                    <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => goToProduto(10)}>
                        <View style={{ width: '90%', height: '100%', flexDirection: isGrid ? 'column' : 'row' }}>
                            <View style={{ width: isGrid ? '100%' : '30%', height: isGrid ? '65%' : '100%', backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon1
                                    name='plus-circle'
                                    color='#b348d9'
                                    size={30}
                                    style={{ marginTop: isGrid ? 15 : 0 }} />
                                <Text
                                    style={{
                                        width: isGrid ? 75 : 0,
                                        height: isGrid ? 40 : 0,
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: '#404040'
                                    }}>
                                    Adicionar novo produto
                            </Text>
                            </View>
                            <View style={{ width: isGrid ? '100%' : '70%', height: '100%', justifyContent: 'center', paddingLeft: 20 }}>
                                <View style={{ width: '100%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#404040' }}> Adicionar Novo Produto </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else if (item.product_id == 7) {
            return (
                <View key={item.product_id} style={viewItem()} >
                    <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => goToProduto(7)}>
                        <Image source={getImage()} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{ width: 0, height: 0}}>
                    
                </View>
            )
        }
    };

    const Filtrar = (value) => {
        switch (value) {
            case 'maisVendidos':
                setFilterValue('product_views DESC');
                break;
            case 'menosVendidos':
                setFilterValue('product_views ASC');
                break;
            case 'maisCaros':
                setFilterValue('product_price DESC');
                break;
            case 'menosCaros':
                setFilterValue('product_price ASC');
                break;
            case 'nomeCrescente':
                setFilterValue('product_name ASC');
                break;
            case 'nomeDecrescente':
                setFilterValue('product_name DESC');
                break;
        }
    }

    useEffect(() => {
        if (page === 'Favoritos')
            setQueryFavoritos('WHERE product_id IN (SELECT product_id FROM table_favoritos) ')
        else
            setQueryFavoritos('')

        if (inputText === '') {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM table_product ' + queryFavoritos + 'ORDER BY ' + filterValue + ', product_name ASC',
                    [],
                    (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));
                        setFlatListItems(temp);
                        setItensEncontrados(results.rows.length.toString())
                        console.log('FlatList', flatListItems)
                        console.log('SALVEEEEEE', flatListItems)
                    }
                );
            })
        } else {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM table_product WHERE product_name LIKE '" + inputText + "%' ORDER BY " + filterValue + ", product_name ASC",
                    [],
                    (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));
                        setFlatListItems(temp);
                        setItensEncontrados(results.rows.length.toString())
                        console.log(flatListItems)
                    }
                );
            })
        }
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_favoritos WHERE user_id = (?)',
                [idUserLogado],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i).product_id);
                    setProdutosFavoritados(temp);
                    console.log('Conteúdo tabela favoritos', temp)
                }
            );
        });
        console.log('PAGINAAAAAAAAAA', page)
    }, [filterValue, inputText, page]);

    useEffect(() => {
        if (page === 'Favoritos')
            setQueryFavoritos('WHERE product_id IN (SELECT product_id FROM table_favoritos) ')
        else
            setQueryFavoritos('')

        if (inputText === '') {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM table_product ' + queryFavoritos + 'ORDER BY ' + filterValue + ', product_name ASC',
                    [],
                    (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));
                        setFlatListItems(temp);
                        setItensEncontrados(results.rows.length.toString())
                        console.log('FlatList', flatListItems)
                        console.log('SALVEEEEEE', flatListItems)
                    }
                );
            })
        } else {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM table_product WHERE product_name LIKE '" + inputText + "%' ORDER BY " + filterValue + ", product_name ASC",
                    [],
                    (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));
                        setFlatListItems(temp);
                        setItensEncontrados(results.rows.length.toString())
                        console.log(flatListItems)
                    }
                );
            })
        }
        console.log('PAGINAAAAAAAAAA', page)
    }, [produtosFavoritados]);

    return (
        <View style={styles.container}>
            <View style={viewFilter(filterHeight)}>
                <DropDownPicker
                    items={[
                        { label: 'Mais Vendidos', value: 'maisVendidos' },
                        { label: 'Menos Vendidos', value: 'menosVendidos' },
                        { label: 'Mais caros', value: 'maisCaros' },
                        { label: 'Menos Caros', value: 'menosCaros' },
                        { label: 'Nome Crescente', value: 'nomeCrescente' },
                        { label: 'Nome Decrescente', value: 'nomeDecrescente' },
                    ]}
                    defaultValue={filter}
                    containerStyle={{ height: 40 }}
                    style={{
                        flexDirection: 'row-reverse',
                        borderWidth: 0
                    }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ backgroundColor: '#fff' }}
                    onChangeItem={(item) => Filtrar(item.value)}
                    onOpen={() => setFilterHeight('58%')}
                    onClose={() => setFilterHeight('12%')}
                />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.filterContainer}>
                    <View style={styles.gridIconContainer}>
                        <TouchableOpacity onPress={() => setGrid(CurrentValue => !CurrentValue)} disabled={isGrid ? true : false}>
                            <Icon name='grid'
                                style={{ marginRight: '10%' }}
                                size={20}
                                color={isGrid ? '#A8A8A8' : '#773A8B'}
                            // disabled={isGridIconDisabled}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setGrid(CurrentValue => !CurrentValue)} disabled={isGrid ? false : true}>
                            <Icon name='list'
                                style={{ marginRight: '13%' }}
                                size={25}
                                color={isGrid ? '#773A8B' : '#A8A8A8'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.flatlistContainer}>
                    <FlatList
                        key={isGrid ? 'h' : 'v'}
                        horizontal={false}
                        numColumns={isGrid ? 2 : 1}
                        data={listItem}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView0(item)}
                        extraData={listItem}
                        style={{ width: '100%', marginHorizontal: isGrid ? '5%' : 0 }}
                    />
                </View>
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
        alignSelf: 'stretch',
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 0,
        margin: 0
    },
    filterContainer: {
        width: '95%',
        height: 46,
        borderBottomWidth: 1,
        zIndex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    gridIconContainer: {
        width: '50%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
    flatlistContainer: {
        width: '100%',
        alignSelf: 'stretch',
        flex: 1,
        margin: 0
    }
})

export default CompMeusProdutos