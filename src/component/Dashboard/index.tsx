import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState({
    totalHotels: 0,
    foodOrders: 0,
    foodRevenue: 0,
    delayServices: 0,
    runningServices: 0,
  });
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVmMTNjNDRlMWQzZTVhMDc3YTdhMDciLCJpYXQiOjE3MjIwNzA0NjR9.Tc084wilUgMSl_OD2OrIQMFCrCL9DvPvoWHN3o5gOSU";

  useEffect(() => {
    const getData = () => {
      return axios
        .get(`https://cs-api.nugen.co.in/hotel/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
          console.log(data, "data");
        })
        .catch((err) => console.error(err));
    };
    getData();
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200">
      <button
        type="submit"
        className="bg-cyan-500 text-white rounded-md px-2 py-1 mb-8"
        onClick={() => router.push("/")}
      >
        Sign out
      </button>

      <div className="flex items-center justify-center w-full gap-4">
        <DashboardCard
          title="Total Hotels"
          value={data.totalHotels}
          color="bg-red-500"
        />
        <DashboardCard
          title="Food Orders"
          value={data.foodOrders}
          color="bg-pink-500"
        />
        <DashboardCard
          title="Food Revenue"
          value={data.foodRevenue}
          color="bg-red-500"
        />
        <DashboardCard
          title="Running Services"
          value={data.runningServices}
          color="bg-cyan-500"
        />
        <DashboardCard
          title="Delay Services"
          value={data.delayServices}
          color="bg-emerald-500"
        />
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  value: number;
  color: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  color,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative flex flex-col items-center justify-center rounded-full shadow-lg ${color} w-40 h-40`}
      >
        <div className="text-white p-3 text-center inline-flex items-center justify-center rounded-full"></div>
        <h5 className="text-white uppercase font-bold text-xs mt-2">{title}</h5>
        <span className="font-semibold text-white text-xl">{value}</span>
      </div>
    </div>
  );
};

export default Dashboard;
