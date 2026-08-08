import React, { useContext, useEffect } from 'react';
import {Accordion, Anchor, Container, Title} from '@mantine/core';
import classes from './about.module.css';
import AboutCard from '../../components/AboutCard/index.jsx';
import { MainContext } from '../../context/MainContext/index.jsx';
import { setPageIndex } from '../../reducer/MainReducer/Actions/index.js';

const About = () => {
  const [, dispatch] = useContext(MainContext);

  useEffect(() => {
    dispatch(setPageIndex(1));
    document.title = 'About | txt-diff';
  }, [dispatch]);

  return (
    <Container>
      <AboutCard className={classes.inner + ' card'} />
      <Container size="sm" className={classes.wrapper}>
        <Title ta="center" className={classes.title}>
          Frequently Asked Questions
        </Title>

        <Accordion variant="separated">
          <Accordion.Item className={classes.item} value="download-desktop-version">
            <Accordion.Control>
              Is there a desktop version available?
            </Accordion.Control>
            <Accordion.Panel>
              Not at the moment. If you'd like us to create a desktop version, please let us know!
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="another-account">
            <Accordion.Control>Do you store my text data?</Accordion.Control>
            <Accordion.Panel>
              No. Difference detection is done entirely on your own device and your text data does not pass our servers.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="newsletter">
            <Accordion.Control>
              Can I use this tool for commercial purposes?
            </Accordion.Control>
            <Accordion.Panel>
              Yes! You can use this tool for any purpose, including commercial
              ones.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="credit-card">
            <Accordion.Control>
              Can I use this tool for free without any limitations?
            </Accordion.Control>
            <Accordion.Panel>
              Yes! You can use this tool for free without any limitations.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </Container>
  );
};

export default About;
