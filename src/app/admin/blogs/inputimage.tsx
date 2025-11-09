import { Plus } from "lucide-react";
import { useRef } from "react";

function InputImage({ imageSrc, setImageSrc, setImageFile }: any) {
  const fileInputRef: any = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <p className="font-semibold">Blog Image</p>

      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Uploaded"
          onClick={handleClick}
          className="h-96 w-auto cursor-pointer object-contain"
        />
      ) : (
        <div
          className="flex size-24 cursor-pointer items-center justify-center rounded-xl border-2"
          onClick={handleClick}
        >
          <Plus />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default InputImage;
