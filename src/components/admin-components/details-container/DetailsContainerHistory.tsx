import { ProductHistory } from '../../../interfaces/product';
interface DetailsContainerHistoryProps {
    history: ProductHistory[];
}

function DetailsContainerHistory({ ...props }: DetailsContainerHistoryProps) {
    const { history } = props;
    return (
        <>
            <pre>{JSON.stringify(history, null, 2)}</pre>
        </>
    );
}

export default DetailsContainerHistory;