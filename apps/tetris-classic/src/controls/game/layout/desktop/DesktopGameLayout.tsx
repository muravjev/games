import S from './DesktopGameLayout.module.scss';

interface DesktopGameLayoutProps {
    top?: JSX.Element;
    bottom?: JSX.Element;
    left?: JSX.Element;
    right?: JSX.Element;
    middle: JSX.Element;
}

const DesktopGameLayout = ({ top, bottom, left, right, middle }: DesktopGameLayoutProps) => {
    return (
        <section className={S.layout}>
            <div className={S.top}>{top}</div>
            <div className={S.bottom}>{bottom}</div>
            <div className={S.left}>{left}</div>
            <div className={S.right}>{right}</div>
            <div className={S.middle}>{middle}</div>
        </section>
    );
};

export default DesktopGameLayout;
