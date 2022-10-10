import type { GetLayoutData } from 'controls/game/layout/GameLayout';

import GameLayout from 'controls/game/layout/GameLayout';
import DesktopWideLayout from './desktop/DesktopWideLayout';
import MobileWideLayout from './mobile/MobileWideLayout';
import MobileSlimLayout from './mobile/MobileSlimLayout';
import MobileThinLayout from './mobile/MobileThinLayout';

import { play } from '../playSlice';

const getLayoutData: GetLayoutData = (isMobile, aspectRatio) => {
    if (isMobile) {
        if (aspectRatio > 1) {
            return MobileWideLayout;
        }
        if (aspectRatio > 0.55) {
            return MobileSlimLayout;
        }
        return MobileThinLayout;
    }
    return DesktopWideLayout;
};

function PlayLayout() {
    return <GameLayout api={play} getLayoutData={getLayoutData} />;
}

export default PlayLayout;
