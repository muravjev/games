import { prepareQueueSpec } from './utils/prepareQueueSpec';
import { createFiguresSpec } from './utils/createFiguresSpec';

describe('game', () => {
    describe('queue utils', () => {
        createFiguresSpec();
        prepareQueueSpec();
    });
});
