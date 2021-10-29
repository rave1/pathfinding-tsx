import styled from "styled-components";
import {useState, useEffect} from 'react';

const Container = styled.div`
  background-color: #f4f4f4;
  display: grid;
  grid-template-columns: repeat(20, 50px);
  grid-template-rows: repeat(10, 50px);
`

interface WrapperProps {
  isWall: boolean;
  isStart?: boolean;
  isFinish?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  border: 1px solid black;
  background-color: ${(props) => props.isWall ? '#f5f' : '#fff'};
`

function App() {

  const [grid, setGrid] = useState<any>([])

  useEffect(() => {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 20; col++) {
        setGrid((oldArray: any) => [...oldArray, {
          x: col,
          y: row,
          isStart: false,
          isFinish: false,
          isVisited: false,
          isWall: false
        }])
      }

    }
  }, [])
  console.log(grid)

  const changeColor = (id: number, x: number, y: number) => {
    const dupa = [...grid]
    dupa[id].isWall = !dupa[id].isWall
    console.log(dupa[id].isWall)
    setGrid([...dupa])

  }



  return (
    <div>
      <Container>
        {
          grid.map((each: any, index: any) => (
            <Wrapper 
              key={index} 
              onClick={() => changeColor(index, each.x, each.y)} 
              id={index}
              isWall={each.isWall}
            >
              {each.x}, {each.y}
            </Wrapper>
          ))
        }
      </Container>
      <button onClick={() => {console.log('dupa')}}>
        dupa
      </button>
    </div>

  );
}

export default App;