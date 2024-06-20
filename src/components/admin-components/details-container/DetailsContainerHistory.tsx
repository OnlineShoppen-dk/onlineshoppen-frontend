import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { ProductHistory } from '../../../interfaces/product';

interface DetailsContainerHistoryProps {
    history: ProductHistory[];
}

function DetailsContainerHistory({ ...props }: DetailsContainerHistoryProps) {
    const { history } = props;
    return (
        <>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Price</Th>
                        <Th>Updated At</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {history.length > 0 ? (
                        history.map((c, i) => (
                            <Tr key={i}>
                                <Th>{c.id}</Th>
                                <Th>{c.name}</Th>
                                <Th>{c.price}</Th>
                                <Th>
                                    {formatDateAndTime(c.updatedAt)}
                                </Th>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Th>No categories</Th>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </>
    );
}

const formatDateAndTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("da-DK") + " " + d.toLocaleTimeString("da-DK");
};

export default DetailsContainerHistory;