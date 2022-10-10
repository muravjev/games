import type { PropsWithChildren } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PageBounds from 'controls/page/_/bounds/PageBounds';

export default function LayoutToolbar({ children }: PropsWithChildren) {
    return (
        <AppBar position="relative" enableColorOnDark>
            <PageBounds type="sides">
                <Toolbar disableGutters>{children}</Toolbar>
            </PageBounds>
        </AppBar>
    );
}
