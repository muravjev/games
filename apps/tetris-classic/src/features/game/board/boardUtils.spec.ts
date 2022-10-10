import { getFigureDropDistanceSpec } from './utils/getFigureDropDistanceSpec';
import { isValidPositionSpec } from './utils/isValidPositionSpec';
import { mergeFigureSpec } from './utils/mergeFigureSpec';
import { getCompletedLinesSpec } from './utils/getCompletedLinesSpec';
import { removeLinesSpec } from './utils/removeLinesSpec';

describe('game', () => {
    describe('board utils', () => {
        getFigureDropDistanceSpec();
        isValidPositionSpec();
        mergeFigureSpec();
        getCompletedLinesSpec();
        removeLinesSpec();
    });
});
