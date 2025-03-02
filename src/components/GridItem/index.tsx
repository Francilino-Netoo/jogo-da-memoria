import * as C from "./styles";
import {GridItemType} from '../../type/gridetipes'

type Props = {
    item: GridItemType,
    onClick: () => void,
}

export const GridItem = ({item, onClick}: Props) => {
  return (
    <C.Container onClick={onClick}>
      ...
    </C.Container>
  );
};
