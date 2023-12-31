import { ImagePreview } from "@/app/_utils/interfaces/Interfaces";
import { TrashAlt } from "@/app/_icons/Index";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from 'uuid';
import ConfirmDeleteBox from "./ConfirmDeleteBox";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

export default function FilesDropzone({
  uploadedFiles,
  setUploadedFiles,
}: {
  uploadedFiles: ImagePreview[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<ImagePreview[]>>;
}) {

  const { theme } = useTheme();
  const [files, setFiles] = useState<ImagePreview[]>([]);
  const [imgPendingDeletion, setImgPendingDeletion] = useState<string|null>(null);
  // to keep track of image that WILL be deleted for the conditional transition to work
  const [imgToBeDeleted, setImgToBeDeleted] = useState<string|null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 5,
    onDrop: acceptedFiles => {
      console.log(acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: uuidv4(), // assign a unique id 
      })));
    }
  });

  const deleteImgPreview = (fileId: string) => {
    setImgToBeDeleted(fileId);
    setTimeout(() => {
      setUploadedFiles(uploadedFiles => uploadedFiles.filter(file => file.id !== fileId))
    }, 300); // ms shall match the duration of the Tailwind opacity transition
  };

  useEffect(() => {
    // update uploaded files when new files are being dropped
    setUploadedFiles(prevFiles => [...prevFiles, ...files]);
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))

  }, [files, setUploadedFiles]);

  const imagePreview = uploadedFiles?.map((file) => (
    <div
      key={file.id}
      className={`inline-flex rounded-sm border border-slate-300 mb-2 mr-2 w-[100px] h-[100px] p-1 box-border relative transition-opacity duration-300
      ${imgToBeDeleted === file.id ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex min-w-0 overflow-hidden relative w-full h-full">
        <Image
          src={file.preview}
          alt={file.name}
          fill={true}
          objectFit="contain"
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      </div>
      <Button
        className="absolute -top-2 -right-2 cursor-pointer z-30 bg-opacity-90"
        variant="solid"
        color="danger"
        size="sm"
        isIconOnly
        onClick={() => {
          imgPendingDeletion ? setImgPendingDeletion(null) : setImgPendingDeletion(file.id)
        }}
      >
        <TrashAlt size={14} />
      </Button>

      {imgPendingDeletion === file.id && (
        <ConfirmDeleteBox
          file={file}
          deleteImgPreview={deleteImgPreview}
          setImgPendingDeletion={setImgPendingDeletion}
        />
      )}
    </div>
  ));
  
  return (
    <>
      <label htmlFor="" className="text-sm font-medium">
        Add some photos
      </label>
      <div
        {...getRootProps()}
        className={twMerge(
          'flex justify-center items-center w-full h-[100px] px-6 py-3 border-2 border-dashed rounded-md cursor-pointer  focus:border-blue-500', 
          theme === 'dark' 
          ? 'bg-slate-800 border-gray-700 hover:border-gray-600' 
          : 'bg-slate-200 border-gray-300 hover:border-gray-400'
        )}
      >
        <input {...getInputProps()} type="file" />
        {isDragActive ? (
          <p className="text-slate-400">Drop the files here ...</p>
        ) : (
          <p className="text-slate-400">
            Drag and drop some files here, or click to select files
          </p>
        )}
      </div>
      <div className="flex flex-row flex-wrap mt-4">
        { imagePreview }
      </div>
    </>
  );
}
