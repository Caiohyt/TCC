import { openDatabase, DEBUG } from 'react-native-sqlite-storage';

DEBUG(true);

export const db = openDatabase({ name: 'UserDatabase.db' });