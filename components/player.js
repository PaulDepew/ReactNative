import { StatusBar } from 'expo-status-bar';
import React, {setState, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import {connect} from 'react-redux';
import player, {createPlayer, createEnemy, defeat, reset, setDifficulty} from '../store/player.js'
import faker from 'faker';



const  Player = (props) =>  {
  console.log(props);

  const roll = (min, max) => {
    let result = min + Math.floor(Math.random()*(max-min +1))
    result.crit = '';

    if(result === max){
      result.crit = 'crit'
    } else if (result === min){
      result.crit= 'fail'
    }
    return result;
  }

  const makeEnemy = async (value) => {
    let name = await faker.name.findName();
   let type = await faker.lorem.sentence()
    let img = await faker.image.avatar();
    let str =  roll(value,100);
    let def =  roll(value,100);
    let health =  roll(value,100);

    let enemy  = {
      name,
      type,
      img,
      str,
      def,
      health
    }
    return props.createEnemy(enemy.data);
  }

  const makePlayer = async (playerInfo, value) => {
    let name = playerInfo.name;
   let type = playerInfo.type;
    let img = playerInfo.img;
    let str =  roll(value,100);
    let def =  roll(value,100);
    let health =  roll(value,100);

    let player  = {
      name,
      type,
      img,
      str,
      def,
      health
    }
    return props.createPlayer(player);
  }

  const fight = ()=> {
    let playerRoll = roll(1, 20);
    let enemyRoll = roll(1, 20);
    let special = false;

    let player = props.character;
    let enemy = props.enemy;

    if(playerRoll >= enemyRoll){
      switch(playerRoll.crit){
        case 'crit':
          special = true
        return enemy.health = 0;
        case 'fail':
          special = true
          return character.health = 0;
        default:
          break;
      } 

      if(!special){
        enemy.health -= character.dmg
      }

    }

    if(playerRoll <= enemyRoll){
      switch(enemyRoll.crit){
        case 'crit':
          special = true
        return character.health = 0;
        case 'fail':
          special = true
          return enemy.health = 0;
        default:
          break;
      } 

      if(!special){
        character.health -= enemy.dmg
      }

    }


    if(character.health === 0){
      return 'DEFEATED'
    }

    if(enemy.health === 0) {
      props.defeat(enemy)
      let enemy = {};
    }
    
    props.createEnemy(enemy);
    props.createPlayer(player);
    
  }


  return (
    <>
    <View style={styles.container}>
      <Text>PLAYER CHARACTER</Text>
      <TextInput placeholder="Name" key='name' value={props.character.name} />
      <TextInput placeholder="Type" key='type' value={props.character.type} />
      <TextInput placeholder="img" key='img' value={props.character.img} />
      <Slider style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={50}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={0}
              onSlidingComplete={(value)=> props.setDifficulty(value)}
        />
      <Button title="Create Character"  onPress={()=> {
        makePlayer(1);
        makeEnemy(1);
        }}/>
      </View>
      <View style={styles.container2}>
      <Button  title="Fight Enemy" onPress={fight
        }/>
      <Button title="RESET" onPress={()=> props.reset()} />
      </View>
      <View style={styles.container}>
        <FlatList 
        data={props.losers}
        keyExtractor={(enemy) => enemy.name}
        renderItem={({enemy}) => {
          return (
            <Text>{enemy.name}</Text>
          )
        }}
        />
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: .05,
    width: '100%'
  },
  container2: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
});

const mapStateToProps = state => {
  return {
    character: state.player.character,
  enemy: state.player.enemy,
  losers: state.player.losers,
  difficulty: state.player.difficulty,
  }
}
const mapDispatchToProps = {createPlayer, createEnemy, defeat, reset, setDifficulty};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
