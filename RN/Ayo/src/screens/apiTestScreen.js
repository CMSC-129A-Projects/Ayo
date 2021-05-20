import React, {useEffect, useState} from 'react'
import { View, Text, Image, FlatList} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import {createSelector} from 'reselect';

import {makeSelectUsers} from '../redux/testScreen/selectors';
import testScreen from '../api/Users';
import setUsers from '../redux/testScreen/actions';

const stateSelector = createSelector(makeSelectUsers, (users) => ({
      users
}))

const actionDispatch = (dispatch) => ({
      setUser: (users) => dispatch(setUsers(users))
})

export default function apiTestScreen() {
      const valsel = useSelector(stateSelector);
      const [users, setUsers] = useState(); 

      const fetchUsers = async () => {
            console.log("Testscreen is: ", testScreen)
            // const response = await testScreen.get('http://localhost:8000/users/users').catch((err) => {
            const response = await testScreen.get('unverifiedcustomers').catch( (err) => {
                  console.log("Error occured: ", err);
            })
            console.log("Response is ", response);
            setUsers(response.data);
            // setUser(response.data);
      }

      // console.log("users: ", users);

      useEffect(() => {
            fetchUsers()
      },[])

      
      return(
            <View>
                  {/* <Image src={{uri: users[1]['valid_id1']}} style={{width:100, height:100}}/> */}
                  <FlatList 
                        data={users}
                        keyExtractor= {(user) => user.username}
                        renderItem = {({item}) => {
                              return (
                                    <View>
                                          <Image source={{uri: item.valid_id1}}
                                                style={{width:150, height:150}}
                                          />
                                    </View>
                              )
                        }}
                  />
                  <Text>Hello</Text>
            </View>
      )
}
