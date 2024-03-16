import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">پروفایل</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={currentUser.avatar}
          alt="profile image"
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          tpe="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
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
