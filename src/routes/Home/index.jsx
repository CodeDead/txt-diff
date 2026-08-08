import React, { useContext } from 'react';
import {
  Alert,
  Button,
  Center,
  Container,
  Group,
  SimpleGrid,
} from '@mantine/core';
import { IconCheck, IconGitCompare, IconTrash } from '@tabler/icons-react';
import LineNumberedTextarea from '../../components/LineNumberedTextarea/index.jsx';
import { MainContext } from '../../context/MainContext/index.jsx';
import useDocumentTitle from '../../hooks/useDocumentTitle/index.js';
import {
  setHighlights,
  setTextA,
  setTextB,
} from '../../reducer/MainReducer/Actions/index.js';
import { diffLines } from '../../utils/diff.js';

const Home = () => {
  const [{ textA, textB, highlights }, dispatch] = useContext(MainContext);

  useDocumentTitle('Home | txt-diff');

  /**
   * Compare the two input texts and map differing lines to per-input
   * highlights: removed lines in the original text, added lines in the
   * modified text
   */
  const compare = () => {
    const diff = diffLines(textA, textB);
    const a = {};
    const b = {};
    let indexA = 0;
    let indexB = 0;
    for (const d of diff) {
      if (d.type === 'removed') {
        a[indexA] = 'removed';
        indexA += 1;
      } else if (d.type === 'added') {
        b[indexB] = 'added';
        indexB += 1;
      } else {
        indexA += 1;
        indexB += 1;
      }
    }
    dispatch(
      setHighlights({
        a,
        b,
        identical: diff.every((d) => d.type === 'unchanged'),
      }),
    );
  };

  /**
   * Change the first text input
   * @param event The event that triggered the change
   */
  const changeTextA = (event) => {
    dispatch(setTextA(event.currentTarget.value));
    dispatch(setHighlights(null));
  };

  /**
   * Change the second text input
   * @param event The event that triggered the change
   */
  const changeTextB = (event) => {
    dispatch(setTextB(event.currentTarget.value));
    dispatch(setHighlights(null));
  };

  /**
   * Clear both inputs and any comparison highlights
   */
  const clear = () => {
    dispatch(setTextA(''));
    dispatch(setTextB(''));
    dispatch(setHighlights(null));
  };

  const hasInput = textA !== '' || textB !== '';

  return (
    <Container size="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <LineNumberedTextarea
          label="Original text"
          placeholder="Paste or type the original text here"
          autoFocus
          value={textA}
          onChange={changeTextA}
          minRows={10}
          maxRows={Number.MAX_SAFE_INTEGER}
          highlights={highlights?.a}
        />
        <LineNumberedTextarea
          label="Modified text"
          placeholder="Paste or type the modified text here"
          value={textB}
          onChange={changeTextB}
          minRows={10}
          maxRows={Number.MAX_SAFE_INTEGER}
          highlights={highlights?.b}
        />
      </SimpleGrid>
      <Center mt="md">
        <Group>
          <Button leftSection={<IconGitCompare size={18} />} onClick={compare}>
            Compare
          </Button>
          {hasInput && (
            <Button
              variant="light"
              color="red"
              leftSection={<IconTrash size={18} />}
              onClick={clear}
            >
              Clear
            </Button>
          )}
        </Group>
      </Center>
      {highlights?.identical && (
        <Alert
          icon={<IconCheck size={18} />}
          title="No differences"
          color="green"
          radius="md"
          mt="lg"
        >
          The two texts are identical.
        </Alert>
      )}
    </Container>
  );
};

export default Home;
