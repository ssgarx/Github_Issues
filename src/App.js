import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  React, { useState } from 'react';
import { Accordion, Alert, Badge, Button, Card, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';

function App() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [issue, setIssue] = useState([]);
  const [errorMsg,setErrorMsg] = useState('Please input owner and repo.');
  const [heading,setHeading] = useState('');



  const changeOwner = (e) => {
    setOwner(e.target.value);
  }
  const changeRepo = (e) => {
    setRepo(e.target.value);
  }

  
  
  const clickHandle=async()=>{
    setHeading(`Issues for (${owner}/${repo}) click on issue to see discription`);
    fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`
    )
      .then((Response) => Response.json())
      .then((result) => {
        setIssue(result);
      })
      .catch((error) => {
        setErrorMsg('Something goes wrong please check inputs.');
      });
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Github Issues</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Form inline className="justify-content-end">
            <FormControl type="text" onChange={(e) => changeOwner(e)} placeholder="Owner" className="mr-sm-2" />
            <FormControl type="text" onChange={(e) => changeRepo(e)} placeholder="Repo" className="mr-sm-2" />
            <Button variant="outline-info" onClick={clickHandle}>Search</Button>
          </Form>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <br/>
      <Container>
      <Alert variant="success"><Alert.Heading>{heading?heading:errorMsg}</Alert.Heading></Alert>
      {issue.map((iss, i) => {
          return (
            <Accordion key={i}>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <p style={{color:'black', fontSize:'18px'}}>❗{' '}{iss.title}{"  "}</p>
                  </Accordion.Toggle>
                  <Badge variant="info">{iss.state}</Badge>{" "}
                  <Nav.Item>
                    <Nav.Link href={iss.html_url}>Goto Issue</Nav.Link>
                  </Nav.Item>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>{iss.body}</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          );
        })}
      </Container>
    </div>
  );
}

export default App;
