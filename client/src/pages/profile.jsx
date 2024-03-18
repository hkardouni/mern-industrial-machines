import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import ShowConfirmation from "../components/showConfirmation";
// import CloseIcon from '@mui/icons-material'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutStart,
  signInFailure,
  signOutSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateStatus, setUpdateStatus] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();
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
        setError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setUpdateStatus(false);

        setError(data.message);
        return;
      }

      setUpdateStatus(true);

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));

      setUpdateStatus(false);

      setError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleConfirmDelete = () => {
    setDeleteConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setDeleteConfirmation(false);
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">پروفایل</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          defaultValue={currentUser.username}
          placeholder="نام کاربری"
          className="rtl-form border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="ایمیل"
          className="rtl-form border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="رمز عبور"
          className="rtl-form border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-green-500 rounded-lg p-3 text-gray-800 font-semibold hover:opacity-90 disabled:opacity-75"
        >
          {loading ? "درحال بروزرسانی..." : "ثبت تغییرات"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleConfirmDelete}
          className="text-red-700 cursor-pointer"
        >
          حذف حساب
        </span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer">
          خروج
        </span>
      </div>
      <ShowConfirmation
        message="آیا از حذف حساب کاربری خود اطمینان دارید؟"
        onCancel={handleCloseConfirmation}
        onConfirm={handleDeleteUser}
        isOpen={deleteConfirmation}
      />
      {updateStatus ? (
        <div className="flex flex-col items-center">
          <Alert
            sx={{
              fontFamily: "Tahoma",
            }}
            variant="outlined"
            severity="success"
            color="success"
            className="float-right mr-4 gap-2"
          >
            تغییرات با موفقیت اعمال شد
          </Alert>
        </div>
      ) : error !== null ? (
        <div className="rtl-form flex flex-col items-center">
          <Alert
            sx={{
              fontFamily: "Tahoma",
            }}
            variant="outlined"
            severity="error"
            color="error"
            className="float-right mr-4 gap-2"
          >
            {`تغییرات با خطا مواجه شد: ${error}`}
          </Alert>
        </div>
      ) : null}
    </div>
  );
}
