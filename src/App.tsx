import React, { useEffect, useState } from "react";
import * as C from "./App.styles";
import Logo from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/infoitenm";
import { Button } from "./button";
import { GridItemType } from './types/gridetipes';
import { items } from './data/items';
import { GridItem } from "./components/GridItem";
import { Tempo } from "./helpers/formtatime";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItem, setGridItem] = useState<GridItemType[]>([]);

  useEffect(() => restAndCreateGrid(), []);

  useEffect(() => {
    if (playing) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1); 
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [playing]); 
  
  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItem.filter(item => item.shown === true);
      
      if (opened.length === 2) {
        let tmpGrid = [...gridItem];
  
        if (opened[0].item === opened[1].item) {
          
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
        } else {
          setTimeout(() => {
            let newGrid = [...tmpGrid];
            for (let i in newGrid) {
              if (newGrid[i].shown && !newGrid[i].permanentShown) {
                newGrid[i].shown = false;
              }
            }
            setGridItem(newGrid);
          }, 1000); 
        }
  
        setGridItem(tmpGrid);
        setShowCount(0);
      }
    }
  }, [showCount, gridItem]);
  
  useEffect(()=>{
    if(moveCount > 0 && gridItem.every(item => item.permanentShown === true)){
      setPlaying(false);
    }
  },[moveCount, gridItem])

  const restAndCreateGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) { 
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2)); 
        }
        tmpGrid[pos].item = i;
      }
    }

    setGridItem(tmpGrid);
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItem];
  
      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1);
        setMoveCount(prev => prev + 1); 
      }
  
      setGridItem(tmpGrid);
    }
  };
  

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={Logo} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={Tempo(timeElapsed)} />
          <InfoItem label="Jogadas" value={moveCount.toString()} />
        </C.InfoArea>
        <Button label="Reiniciar" icon={RestartIcon} onClick={restAndCreateGrid} />
      </C.Info>

      <C.GridArea>
        <C.Grid>
          {gridItem.map((item, index) => (
            <GridItem key={index} item={item} onClick={() => handleItemClick(index)} />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
