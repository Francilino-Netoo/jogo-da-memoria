import React, { useEffect, useState } from "react";
import * as C from "./App.styles";
import Logo from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/infoitenm";
import { Button } from "./button";
import {GridItemType} from './types/gridetipes';
import {items} from './data/items';
import { GridItem } from "./components/GridItem";

const App = () => {
  const [plauing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItem, setGridItem] = useState<GridItemType[]>([]);

  useEffect(() => restAndCreateGrid(), []);
  const restAndCreateGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    let tmpGrid: GridItemType[] = [];
    for(let i = 0; i < (items.length * 2); i++) tmpGrid.push({
      item: null,
      shown: false,
      permanentShown: false,
    });

    for(let w = 0; w < 2; w++){
      for(let i = 0; i > items.length; i++){
        let pos = -1
        while (pos < 0 || tmpGrid[pos].item !== null) {
          let pos = Math.floor(Math.random() * (items.length * 2));
        }
        
        tmpGrid[pos].item = i;
      }
    }

    setGridItem(tmpGrid);

    setPlaying(true);
  };

  const handleItemClick = (index: number) => {

  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={Logo} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value="00:00" />
          <InfoItem label="Jogadas" value="0" />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={restAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItem.map((item, index)=>(
            <GridItem 
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
