import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Block from './block';

const Chain = ({chain, isHidden}) => {
    return <Row style={{marginTop: "20px"}}>
            <Col style={headerStyle} md={{span: 6, offset: 3}}>
                <Row>
                    <Col>
                        <h4 className='text-start'>CPF: {chain.cpf}</h4>
                    </Col>
                    <Col>
                        <h4 className="text-end">Saldo: R${chain.saldo}</h4>
                    </Col>                    
                </Row>
                <Row>
                    <Col>
                        {chain.blocks.map((block) => (
                            <Block key={block.index} block={block} isHidden={isHidden} />
                        ))}
                    </Col>
                </Row>
        </Col>
    </Row>
}

const headerStyle = {
    backgroundColor: "#ddd", 
    padding: 20, 
    borderRadius: 10
}

export default Chain;