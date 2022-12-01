
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Chain from '../components/chain';
import FormTransacao from '../components/form';

const Home = () => {
  const [chains, setChains] = useState([]);
  const [inputs, setInputs] = useState({"funcao": "deposito"});
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    loadBlocks()
  },[])

  const loadBlocks = async () => {
    await fetch('https://blockchain-criptografia.azurewebsites.net/get_chain')
      .then(response => response.json())
      .then(data => {setChains(data)});
  }

  const handleSubmit = (e) => {
    fetch('https://blockchain-criptografia.azurewebsites.net/add_block', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    }).then(data => {
      if(!data.ok){
        throw Error(data.status);
      }
      return data
    }).then(() => loadBlocks())
    e.preventDefault();
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  return (
    <>
      <FormTransacao
        handleChange={handleChange}
        handleSubmit={handleSubmit} 
        inputs={inputs}/>
      <Row style={{marginTop: "50px"}} hidden={!chains.length}>
        <Col md={{span: 6, offset: 3}}>
          <Row>
            <Button 
              variant={isHidden ? "secondary" : "dark"}
              onClick={() => {setIsHidden(!isHidden)}}
            >
              {isHidden ? "Exibir JSON" : "Esconder JSON"}
            </Button>
          </Row>
        </Col>        
      </Row>                
      {chains.map((chain) => (
        <Chain key={chain.cpf} chain={chain} isHidden={isHidden}/>
      ))}

    </>
  );
}

export default Home;