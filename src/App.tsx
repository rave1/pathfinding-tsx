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
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  border: 1px solid black;
  background-color: ${(props) =>
    colorPicker(props.isFinish, props.isStart, props.isVisited, props.isWall)};
`;

const colorPicker = (
  isFinish: boolean,
  isStart: boolean,
  isVisited: boolean,
  isWall: boolean
) => {
  if (isFinish) {
    return "red";
  }
  if (isStart) {
    return "green";
  }
  if (isWall) {
    return "brown";
  }
  if (isVisited) {
    return "yellow";
  }
  return "white";
};

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
    const grid_copy = [...grid]
    grid_copy[id].isWall = !grid_copy[id].isWall
    console.log(grid_copy[id].isWall)
    setGrid([...grid_copy])

  }

  const setStart = (id: number) => {
    const grid_copy = grid;
    grid_copy[id].isStart = true;
    setGrid([...grid_copy]);
  };

  const setStop = (id: number) => {
    const grid_copy = grid;
    grid_copy[id].isFinish = true;
    setGrid([...grid_copy]);
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
            isFinish={each.isFinish}
            isStart={each.isStart}
            isVisited={each.isVisited}
            >
              {each.x}, {each.y}
            </Wrapper>
          ))
        }
      </Container>
      <button onClick={() => setStart(82)}>Select start</button>
      <button onClick={() => setStop(97)}>Select end</button>
    </div>

  );
}

export default App;