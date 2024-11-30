import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";

const FrequentlyAskQuestion = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/faqs")
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }, []);

  return (
    <div>
      <Accordion>
        {faqs.map((faq, index) => (
          <Accordion.Item key={faq.faqID} eventKey={String(index)}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body>{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default FrequentlyAskQuestion;
