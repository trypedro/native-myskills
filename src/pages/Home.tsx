import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Platform,
  FlatList
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface SkillData {
  id: string
  name: string
}

export function Home() {
  const [greeting, setGreeting] = useState('')
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<SkillData[]>([])

  function handleAddNewSkill() {
    const data: SkillData = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills((oldSkills) => [...oldSkills, data])
  }

  useEffect(() => {
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
      setGreeting('Good Morning')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good night')
    }
  }, [mySkills])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Pedro</Text>
      <Text style={styles.greetings}>{greeting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} title="Add" />

      <Text style={[styles.title, { marginVertical: 50 }]}>My skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SkillCard skill={item.name} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70
  },

  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 24
  },

  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },

  greetings: {
    color: '#FFF'
  }
})
