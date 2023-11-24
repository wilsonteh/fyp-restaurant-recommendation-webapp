import { ImagePreview } from "@/app/_utils/interfaces/Interfaces";
import { Button } from "@nextui-org/react";
import { Check, Times } from "@/app/_icons/Index";

export default function ConfirmDeleteBox({
  file,
  deleteImgPreview, 
  setImgPendingDeletion, 
} : {
  file: ImagePreview,
  deleteImgPreview: (fileId: string) => void, 
  setImgPendingDeletion: (fileId: string|null) => void, 
}) {

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-800/50 border-1 shadow-lg z-10 flex flex-col">
      <div className="h-full flex items-end justify-center">
        <Button
          variant="solid"
          color="danger"
          size="sm"
          radius="none"
          className="min-w-0 w-full bg-opacity-80 hover:bg-opacity-100"
          aria-label="retain image"
          onClick={() => setImgPendingDeletion(null)}
        >
          <Times size={15} />
        </Button>
        <Button
          variant="solid"
          color="success"
          size="sm"
          radius="none"
          className="min-w-0 w-full bg-opacity-80 hover:bg-opacity-100"
          aria-label="delete image"
          onClick={() => deleteImgPreview(file.id)}
        >
          <Check size={15} />
        </Button>
      </div>
    </div>
  );
}
