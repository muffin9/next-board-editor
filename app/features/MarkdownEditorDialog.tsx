import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    Checkbox,
    LabelDatePicker,
    Button,
    Separator,
    DialogClose,
} from "@/components/ui";
import MarkdownEditor from "@uiw/react-markdown-editor";

interface MarkdownEditorDialogProps {
    children?: React.ReactNode;
}

function MarkdownEditorDialog({ children }: MarkdownEditorDialogProps) {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center gap-2">
                                <Checkbox className="h-5 w-5 min-w-5" />
                                <input
                                    type="text"
                                    placeholder="게시물의 제목을 입력하세요."
                                    className="text-xl outline-none bg-transparent"
                                />
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            마크다운 에디터를 사용하여 TODO_BOARD를 예쁘게
                            꾸며봐요!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-5">
                        <LabelDatePicker label="From" />
                        <LabelDatePicker label="To" />
                    </div>
                    <Separator />
                    <MarkdownEditor className="h-[320px]" />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" variant="ghost">
                                취소
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button>등록</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export { MarkdownEditorDialog };
