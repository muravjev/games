import FallbackLayout from './layout/FallbackLayout';
import FallbackContent from './content/FallbackContent';

export default function Fallback() {
    console.log('%cFallback', 'color:lightseagreen');
    return (
        <FallbackLayout>
            <FallbackContent />
        </FallbackLayout>
    );
}
