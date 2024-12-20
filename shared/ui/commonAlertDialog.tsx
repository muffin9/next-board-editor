"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/ui";

interface Props {
    triggerElement: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
}
function CommonAlertDialog({
    triggerElement,
    title,
    description,
    children,
}: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{triggerElement}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>{children}</AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export { CommonAlertDialog };
