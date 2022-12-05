import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { Menu, MenuTypeProps } from '../../components/Menu';
import { Skill } from '../../components/Skill';
import { Button } from '../../components/Button';

import { Container, Title, Input, Form, FormTitle } from './styles';

import { database } from '../../databases';
import { SkillModel } from '../../databases/model/skillModel';

export function Home() {
  const [type, setType] = useState<MenuTypeProps>("soft");
  const [name, setName] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null);

  async function handleSave() {
    await database.write(async() => {
      await database.get<SkillModel>('skills').create(data => {
        data.name = name,
        data.type = type
      })
    })
  }

  async function fetchData() {
    const skillCollection = database.get<SkillModel>('skills');
    const response = await skillCollection.query().fetch();
    console.log(response)
  }
  return (
    <Container>
      <Title>About me</Title>
      <Menu
        type={type}
        setType={setType}
      />

      <FlatList
        data={[]}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Skill
            data={item}
            onEdit={() => { }}
            onRemove={() => { }}
          />
        )}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['1%', '35%']}
      >
        <Form>
          <FormTitle>New</FormTitle>

          <Input
            placeholder="New skill..."
            onChangeText={setName}
            value={name}
          />

          <Button
            title="Save"
            onPress={handleSave}
          />
        </Form>
      </BottomSheet>
    </Container>
  );
}