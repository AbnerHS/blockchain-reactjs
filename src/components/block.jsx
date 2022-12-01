import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

const Block = ({ block, isHidden }) => {
    const [isHover, setIsHover] = useState(false);
    const color = block.funcao === 'deposito' ? '#2e662e' : '#872029';
    const blockCss = blockStyle(color, isHover);

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    return <>
    <Row>
        <Col style={blockCss} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Row>
                <Col className="text-start">R${block.valor}</Col>
                <Col className="text-end">{block.funcao}</Col>   
            </Row>
        </Col>
        <Row hidden={isHidden} style={{marginTop: 15}}>
            <pre style={{fontWeight: "bold"}}>{JSON.stringify(block, null, 2)}</pre>
        </Row>
    </Row>
    </>
}

const blockStyle = (color, isHover) => {
    return {
        marginTop: 10, 
        padding: 10, 
        borderRadius:10, 
        backgroundColor: color, 
        color: 'white', 
        fontWeight: "500", 
        fontSize: 16, 
        cursor: 'pointer',
        backgroundPosition: 'center',
        transition: 'background 0.5s',
        background: isHover ? "#bbb center" : color,
    }
}

export default Block;