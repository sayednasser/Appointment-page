import { useEffect, useState } from "react";
import apiClient from "../../admin/api/axiosClient";

export function useBookedSlots(doctorId, date) {
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (!doctorId || !date) {
      setBookedSlots([]);
      return;
    }

    apiClient
      .get("/appointment/booked-slots", {
        params: {
          doctor: doctorId,
          date,
        },
      })
      .then(({ data }) => {
        setBookedSlots(data?.data ?? []);
      })
      .catch(() => {
        setBookedSlots([]);
      });

  }, [doctorId, date]);

  return { bookedSlots };
}