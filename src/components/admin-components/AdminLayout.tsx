import { Button, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <Grid>
            <GridItem gap={4}>
                {/* Admin Header */}
                <Button
                    onClick={() => window.location.href = "/admin"}
                >
                    Admin
                </Button>
                <Button
                    onClick={() => window.location.href = "/admin/products"}
                >
                    Products
                </Button>
            </GridItem>
            <GridItem>
                <Outlet />
            </GridItem>
        </Grid>
    )
}

export default AdminLayout;