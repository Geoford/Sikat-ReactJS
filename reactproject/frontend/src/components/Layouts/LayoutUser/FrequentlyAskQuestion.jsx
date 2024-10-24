import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

const FrequentlyAskQuestion = () => {
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Question 1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Question 2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FrequentlyAskQuestion;
