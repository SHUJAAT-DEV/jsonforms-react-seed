import Dropzone from 'react-dropzone-uploader';

// Custom renderer for the image-uploader format

interface IProps {
  data: any;
  handleChange: (text: any) => void;
}
const ImageUploaderControl = ({ data, handleChange }: IProps) => {
  const getUploadParams = (file: any) => ({ url: '/upload-endpoint' }); // Replace with your upload endpoint

  const handleChangeStatus = ({ meta, file, xhr }: any, status: any) => {
    if (status === 'done') {
      const uploadedImageUrl = JSON.parse(xhr?.response).url; // Get the URL from your server response
      const updatedData = [...data, uploadedImageUrl];
      handleChange(updatedData);
    }
  };
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      accept='image/*' // Accept only image files
      inputContent='Drop or click to upload images'
    />
  );
};

export default ImageUploaderControl;
