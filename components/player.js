import { StatusBar } from 'expo-status-bar';
import React, {setState, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import {connect} from 'react-redux';
import player, {createPlayer, createEnemy, defeat, reset, setDifficulty} from '../store/player.js'
import faker from 'faker';



const  Player = (props) =>  {

  useEffect(() => {
    makePlayer(1);
    makeEnemy(1);
  }, []);

  const roll = (min, max) => {
    let result = {
      roll:0,
      crit:'',
    };
     let number = min + Math.floor(Math.random()*(max-min +1))

     result.roll += number;

    if(result === max){
      result.crit = 'crit'
    } else if (result === min){
      result.crit = 'fail'
    }
    return result;
  }

  const makeEnemy = async (value) => {
    let randomPerson = roll( 0, props.contact.length).roll;

    let name = props.contact[randomPerson].name;
   let type = props.contact[randomPerson].phoneNumbers[0].digits;
    let img = props.contact[randomPerson].imageAvailable;
    let str =  roll(value,100).roll;
    let def =  roll(value,100).roll;
    let health =  roll(value,100).roll;

    let enemy  = {
      name,
      type,
      img,
      str,
      def,
      health
    }

    props.createEnemy(enemy);
  }

  const makePlayer = ( value) => {
    let str =  roll(value,100).roll;
    let def =  roll(value,100).roll;
    let health =  roll(value,100).roll;

    let player  = {
      str,
      def,
      health
    }
    props.createPlayer(player);
  }

  const fight = ()=> {
    let playerRoll = roll(1, 20);
    let enemyRoll = roll(1, 20);
    // let special = false;

    let player = props.character;
    let enemy = props.enemy;

   

      if(playerRoll.roll >= enemyRoll.roll) {
        enemy.health = 0;
      } 

      if(playerRoll.roll < enemyRoll.roll){
        player.health = 0
      }


      if(enemy.health === 0){
      props.defeat(enemy.name);
      makeEnemy(1)
    }
    props.createEnemy(enemy);
    props.createPlayer(player);
  }

  if (props.character.health === 0 ) {
    return <Button title="You Died :(" onPress={(e)=> {
      props.reset()}} />;
  }

  return (
    <>
    <View style={styles.container}>
      <Text>YOUR CHARACTER</Text>
      <Slider style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={50}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={0}
              onSlidingComplete={(value)=> props.setDifficulty(value)}
        />
      <Button title="Create Character"  onPress={(e)=> {
        makePlayer(1);
        makeEnemy(1);
        }}/>
      </View>
      <View style={styles.container2}>
      <Button  title={`Fight ${props.enemy.name ? props.enemy.name : ''}`} onPress={(e)=> {
        fight();
      }}/>
      
      </View>
      {/* <View style={styles.container}>
        <FlatList 
          data={props.losers ? props.losers : null}
          keyExtractor={(loser) => loser.type}
          renderItem={({loser}) => {
            return (
            <Text>{loser}</Text>
            )
          }}
          />

      </View> */}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:.6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  container2: {
    backgroundColor: 'transparent',

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
