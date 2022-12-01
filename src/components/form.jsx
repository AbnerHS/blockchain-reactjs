import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormTransacao = ({handleSubmit, handleChange, inputs}) => {
    return <Row>
        <Col md={{ span: 6, offset: 3}}>
          <h3 className='text-center'>Enviar Transação</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Row>
                <Form.Control 
                  type="text" placeholder="CPF" name="cpf" value={inputs.cpf || ""} onChange={handleChange} />              
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Form.Control 
                  type="text" placeholder="Valor" name="valor" value={inputs.valor || ""} onChange={handleChange} />              
              </Row>
            </Form.Group>
            <Form.Group onChange={handleChange} style={{margin: 10}}>
              <center>
              <Form.Check
                  inline
                  type="radio"
                  name="funcao"
                  label="Depósito"
                  value="deposito"
                  defaultChecked
                  />
                <Form.Check
                  inline
                  type="radio"
                  name="funcao"
                  label="Saque"
                  value="saque"
                  />
                
              </center>
            </Form.Group>
            <Row>
              <Button variant='secondary' style={{width: "100%"}} type="submit">Enviar</Button>
            </Row>
          </Form>
        </Col>
    </Row>
}

export default FormTransacao;