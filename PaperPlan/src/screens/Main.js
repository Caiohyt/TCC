import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import Pp_logo from '../../assets/images/Pp_logo.png'
import Email_icon from '../../assets/images/Email_icon.png'
import Fb_icon from '../../assets/images/Fb_icon.png'
import Google_icon from '../../assets/images/Google_icon.png'
import { db } from '../services/db'

const Main = ({ navigation }) => {
    useEffect(() => {
        console.log(db);
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "DROP TABLE IF EXISTS table_user", [],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "DROP TABLE IF EXISTS table_product", [],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "DROP TABLE IF EXISTS table_productupdate", [],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "DROP TABLE IF EXISTS table_favoritos", [],
        //     );
        // })
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(50), user_email VARCHAR(50), user_password VARCHAR(50), user_image VARCHAR(255), user_dayofbirth INT, user_monthofbirth INT, user_yearofbirth INT, user_cpf INT, user_cellphone VARCHAR(50))',
                            []
                        );
                    }
                }
            );
        })
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_product'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_product', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_product(product_id INTEGER PRIMARY KEY AUTOINCREMENT, vendedor_id INT, product_name VARCHAR(50), product_price VARCHAR(50), product_color1 VARCHAR(50), product_color2 VARCHAR(50), product_color3 VARCHAR(50), product_color4 VARCHAR(50), product_color5 VARCHAR(50), product_color6 VARCHAR(50), product_color7 VARCHAR(50), product_color8 VARCHAR(50), product_color9 VARCHAR(50), product_color10 VARCHAR(50), product_size1 INT, product_size2 INT, product_size3 INT, product_size4 INT, product_size5 INT, product_category VARCHAR(50), product_material VARCHAR(50), product_rating DECIMAL(2,1), product_image VARCHAR(255), product_views INT)',
                            []
                        );
                    }
                }
            );
        })
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_productupdate'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_productupdate', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_productupdate(product_id INTEGER PRIMARY KEY AUTOINCREMENT, vendedor_id INT, product_name VARCHAR(50), product_price VARCHAR(50), product_color1 VARCHAR(50), product_color2 VARCHAR(50), product_color3 VARCHAR(50), product_color4 VARCHAR(50), product_color5 VARCHAR(50), product_color6 VARCHAR(50), product_color7 VARCHAR(50), product_color8 VARCHAR(50), product_color9 VARCHAR(50), product_color10 VARCHAR(50), product_size1 INT, product_size2 INT, product_size3 INT, product_size4 INT, product_size5 INT, product_category VARCHAR(50), product_material VARCHAR(50), product_rating DECIMAL(2,1), product_image VARCHAR(255), product_views INT)',
                            []
                        );
                    }
                }
            );
        })
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_favoritos'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_favoritos', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_favoritos(user_id INT, product_id INT)',
                            []
                        );
                    }
                }
            );
        })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_product (product_name, product_price, product_color1, product_color2, product_color3, product_color4, product_color5, product_size1, product_size2, product_size3, product_size4, product_size5, product_category, product_material, product_views) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //         ['Rinoceronte Origami(papel)', '1,35', '#333333', '#707070', '#0000ff', '#000', '#8800ff', 15, 20, 25, 30, 40, 'Xandão', 'Aço', 1000],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_product (product_name, product_price, product_color1, product_color2, product_color3, product_color4, product_color5, product_color6, product_color7, product_size1, product_size2, product_size3, product_size4, product_category, product_material, product_views) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //         ['Almofada(tecido)', '25,00', '#000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#8800ff', '#ffe4db', 40, 45, 50, 60, 'Xandão', 'Aço', 1200],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_product (product_name, product_price, product_color1, product_color2, product_color3, product_size1, product_size2, product_size3, product_category, product_material, product_views) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        //         ['Tsuru(papel)', '0,45', '#0377fc', '#fc03fc', '#fc7303', 10, 15, 30, 'Xandão', 'Aço', 1500],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_product (product_name, product_price, product_color1, product_color2, product_color3, product_color4, product_size1, product_category, product_material, product_views) VALUES (?,?,?,?,?,?,?,?,?,?)",
        //         ['Porta treco(madeira)', '7,50', '#965039', '#8a6d63', '#d4bcb4', '#e05122', 20, 'Xandão', 'Aço', 2000],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_product (product_name, product_price, product_color1, product_color2, product_color3, product_color4, product_size1, product_category, product_material, product_views) VALUES (?,?,?,?,?,?,?,?,?,?)",
        //         ['Casinha de boneca(mdf)', '45,50', '#965039', '#8a6d63', '#d4bcb4', '#e05122', 20, 'Xandão', 'Aço', 1100],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_productupdate (product_id, product_name, product_price, product_color1, product_color2, product_color3, product_size1, product_category, product_material, product_views) VALUES (?,?,?,?,?,?,?,?,?,?)",
        //         [6, 'BraboLetra Ogirami', '85,69', '#6b4538', '#4d5e53', '#363957', 99, 'Dobrassão', 'Madeira', 0],
        //     );
        // })
         // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_productupdate (product_id, product_name, product_price, product_color1, product_color2, product_color3, product_size1, product_category, product_material, product_views) VALUES (?,?,?,?,?,?,?,?,?,?)",
        //         [7, 'BraboLetra Ogirami', '85,69', '#6b4538', '#4d5e53', '#363957', 99, 'Dobrassão', 'Madeira', 0],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_productupdate (product_id, product_name, product_price, product_color1, product_color2, product_color3, product_color4, product_color5, product_color6, product_size1, product_size2, product_size3, product_size4, product_size5, product_category, product_material, product_views) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //         [8, 'Borboleta Origami', '0,35', '#2DCAC6', '#FD7633', '#428DFC', '#6DE5A5', '#CA1414', '#FFA493', 5, 10, 15, 20, 30, 'Origami', 'Tecido', 0],
        //     );
        // })
        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "INSERT INTO table_productupdate (product_id, product_name, product_price, product_category, product_material, product_views) VALUES (?,?,?,?,?,?)",
        //         [10, 'Nome do Produto', '0,00', 'Categoria', 'Material', 0],
        //     );
        // })
    }, []);
    return (
        <View style={styles.container}>
            <Image source={Pp_logo} style={styles.imgPp_logo} />
            <Text style={styles.txtBemVindo}>Bem-Vindo ao Paper Plan!</Text>
            <Text style={styles.txtTexto}>
                Crie uma conta ou faça login para começar a comprar e vender seu
                artesanato!
            </Text>
            <View style={styles.contButton}>
                <TouchableOpacity style={styles.btn} activeOpacity={0.3}>
                    <Image source={Google_icon}></Image>
                    <Text style={styles.txtButton}>Continuar com Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} activeOpacity={0.3}>
                    <Image source={Fb_icon}></Image>
                    <Text style={styles.txtButton}>Continuar com Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} activeOpacity={0.3} onPress={() => (navigation.navigate('Login'))}>
                    <Image source={Email_icon}></Image>
                    <Text style={styles.txtButton}>Continuar com Email</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: '100%'
    },
    txtBemVindo: {
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
        width: '77%'
    },
    imgPp_logo: {
        margin: '23%',
        marginBottom: '17%',
    },
    contButton: {
        alignItems: 'stretch',
        width: '67%',
        marginTop: 30,
    },
    btn: {
        flexDirection: "row",
        borderRadius: 5,
        borderColor: "#707070",
        borderWidth: StyleSheet.hairlineWidth,
        paddingVertical: 5,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    txtButton: {
        marginLeft: 10
    }
})

export default Main;