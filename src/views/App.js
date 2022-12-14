
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { urlServer } from '../components/url';
import Chain from '../components/chain';
import FormTransacao from '../components/form';

const Home = () => {
  const [chains, setChains] = useState([]);
  const [inputs, setInputs] = useState({"funcao": "deposito"});
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadBlocks()
  },[])

  const loadBlocks = async () => {
    await fetch(`${urlServer}/get_chain`)
      .then(response => response.json())
      .then(data => {setChains(data); setIsLoading(false)});
  }

  const handleSubmit = (e) => {
    setIsLoading(true)
    fetch(`${urlServer}/add_block`, {
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

  const handleClear = () => {
    fetch(`${urlServer}/clean_chain`, {
     method: "POST", 
    }).then(() => loadBlocks());
  }

  return (
    <div style={{padding: 20, paddingRight: 22}}>
      <FormTransacao
        handleChange={handleChange}
        handleSubmit={handleSubmit} 
        isLoading={isLoading}
        inputs={inputs}/>
      <Row style={{marginTop: 50}} hidden={!chains.length}>
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
      <Button variant={"danger"} style={buttonClear} onClick={handleClear}>
        Limpar Blockchain
      </Button>  
    </div>
  );
}

const buttonClear = {
  position: "fixed",
  right: 10,
  bottom: 10,
}

export default Home;