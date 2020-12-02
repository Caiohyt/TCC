import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './src/screens/Main';
import Login from './src/screens/Login';
import RecuperarSenha from './src/screens/RecuperarSenha'
import Cadastro from './src/screens/Cadastro'
import DrawerNavigation from './src/components/DrawerNavigation'
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export const ContextUserName = createContext();
export const ContextIdUserLogado = createContext();
export const ContextInputPesquisa = createContext();
export const ContextIsInPage = createContext();
export const ContextItensEncontrados = createContext();
export const ContextQuery = createContext();
export const ContextThisProductId = createContext();


const App = () => {

  const [userName, setUserName] = useState('');
  const [idUserLogado, setIdUserLogado] = useState('');
  const [inputText, setInputText] = useState('');
  const [page, setPage] = useState('');
  const [itensEncontrados, setItensEncontrados] = useState('');
  const [queryFavoritos, setQueryFavoritos] = useState('');
  const [thisProductId, setThisProductId] = useState('');

  LogBox.ignoreAllLogs();

  return (
    <ContextUserName.Provider value={[userName, setUserName]}>
      <ContextIdUserLogado.Provider value={[idUserLogado, setIdUserLogado]}>
        <ContextInputPesquisa.Provider value={[inputText, setInputText]}>
          <ContextIsInPage.Provider value={[page, setPage]}>
            <ContextItensEncontrados.Provider value={[itensEncontrados, setItensEncontrados]}>
              <ContextQuery.Provider value={[queryFavoritos, setQueryFavoritos]}>
                <ContextThisProductId.Provider value={[thisProductId, setThisProductId]}>
                  <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                      headerShown: false
                    }} initialRouteName='Main'>
                      <Stack.Screen component={Main} name='Main' />
                      <Stack.Screen component={Login} name='Login' />
                      <Stack.Screen component={RecuperarSenha} name='RecuperarSenha' />
                      <Stack.Screen component={Cadastro} name='Cadastro' />
                      <Stack.Screen component={DrawerNavigation} name='DrawerNavigation' />
                    </Stack.Navigator>
                  </NavigationContainer>
                </ContextThisProductId.Provider>
              </ContextQuery.Provider>
            </ContextItensEncontrados.Provider>
          </ContextIsInPage.Provider>
        </ContextInputPesquisa.Provider>
      </ContextIdUserLogado.Provider>
    </ContextUserName.Provider>
  );
};

export default App;
