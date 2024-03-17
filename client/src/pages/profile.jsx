import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleUploadImage(file);
    }
  }, [file]);

  const handleUploadImage = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">پروفایل</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="rtl-form flex flex-col items-center">
          {fileUploadError ? (
            <span className="text-red-700">خطا در بارگذاری تصویر </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-slate-700">
              {`در حال بارگذاری... ${imagePercentage} %`}
            </span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-700">تصویر با موفقیت بارگذاری شد</span>
          ) : null}
        </p>
        <input
          type="text"
          id="username"
          placeholder="نام کاربری"
          className="rtl-form border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="ایمیل"
          className="rtl-form border p-3 rounded-lg"
        />
        <input
          tpe="password"
          id="password"
          placeholder="رمز عبور"
          className="rtl-form border p-3 rounded-lg"
        />
        <button className="bg-green-500 rounded-lg p-3 text-gray-800 font-semibold hover:opacity-90 disabled:opacity-75">
          بروز رسانی
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">حذف حساب</span>
        <span className="text-red-700 cursor-pointer">خروج</span>
      </div>
    </div>
  );
}
