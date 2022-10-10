export {};
// import { useSelector } from 'react-redux';
// import {
//     selectContextFigure,
//     selectContextPhase,
//     selectContextPosition
// } from 'features/game/context/contextSlice';

// import { getMatrixSize } from 'utils/matrix';
// import { PHASE } from 'features/game/context/contextConsts';

// import { styled } from '@mui/material/styles';
// import S from './Center.module.scss';

// const HIDDEN = Object.freeze({
//     [PHASE.INIT]: true,
//     [PHASE.DONE]: true,
//     [PHASE.SPAWN]: true,
//     [PHASE.BURN]: true
// });

// export const Center = ({ cellwidth }) => {
//     const figure = useSelector(selectContextFigure);
//     const position = useSelector(selectContextPosition);
//     const phase = useSelector(selectContextPhase);

//     if (HIDDEN[phase]) return null;

//     const pointerWidth = cellwidth / 2;

//     const size = getMatrixSize(figure);
//     const left = cellwidth * (position.x + size[0] / 2) - pointerWidth / 2;
//     const top = cellwidth * (position.y + size[1] / 2) - pointerWidth / 2;
//     const width = `${pointerWidth}px`;

//     const Styled = styled('span')({
//         width: width,
//         height: width,
//         left: `${left}px`,
//         top: `${top}px`
//     });

//     return <Styled className={S.center} />;
// };
