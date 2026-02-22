import { useEffect } from "react";
import { useParams } from "react-router";
import BookingCard from "../../components/cards/BookingCard";
import QuickFacts from "../../components/cards/QuickFactsCard";
import ResortDetails from "../../components/trip/TripDetails";

const Trip = () => {
  const params = useParams();
  useEffect(() => {
    console.log(params);
    return () => {};
  }, [params]);

  return (
    <>
      <BookingCard />
      <QuickFacts />
      <ResortDetails />
    </>
  );
};

export default Trip;
