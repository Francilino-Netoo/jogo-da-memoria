import React, { useEffect, useState } from "react";
import * as C from "./App.styles";
import Logo from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/infoitenm";
import { Button } from "./button";

const App = () => {
  const [plauing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItem, setGridItem] = useState<>([]);

  useEffect(() => restAndCreateGrid(), []);
  const restAndCreateGrid = () => {};

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
        <C.Grid></C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
