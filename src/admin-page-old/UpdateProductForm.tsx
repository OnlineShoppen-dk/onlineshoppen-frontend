// TODO: This is more of a template file, it is not used in the project, but may be useful in the future for Fullstack Exam
/*
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UpdateProduct } from '@/server/product-actions'
import { UpdateProductRequest } from '@/types/admin-types/admin-product-types'
import { Product } from '@/types/domain-types'
import { ConfirmationWindow } from '@/utils/alerts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Product } from "../interfaces/product"
import { ConfirmationWindow } from '@/utils/alerts';

const updateProductFormSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(2),
    price: z.number().min(0).max(1000000),
    stock: z.number().min(0).max(1000000),
    sold: z.number().min(0).max(1000000),
})

type UpdateProductModalProps = {
    product: Product
    action: (result: any) => void
}

export function UpdateProductForm({ ...props }: UpdateProductModalProps) {
    const { product, action } = props;
    const form = useForm<z.infer<typeof updateProductFormSchema>>({
        resolver: zodResolver(updateProductFormSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            sold: product.sold,
        },
    })
    const onSubmit = async (data: z.infer<typeof updateProductFormSchema>) => {
        if(
            !ConfirmationWindow(
                "Update Product",
                "Are you sure you want to update this product?"
            )
        ) {
            return;
        }
        const newProduct = product;
        newProduct.name = data.name;
        newProduct.description = data.description;
        newProduct.price = data.price;
        newProduct.stock = data.stock;
        newProduct.sold = data.sold;
        // Update product actions
        const result = true;
        // Make if an error happens

        if(result){
            action("Product updated successfully");
        }
    }
    return (
        <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className=" grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(event) =>
                                            field.onChange(+event.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(event) =>
                                            field.onChange(+event.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sold"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sold</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(event) =>
                                            field.onChange(+event.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
*/